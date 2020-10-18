import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import orphanageView from '../views/orphanages_view';
import * as Yup from 'yup';

import Orphanage from '../models/Orphanage';

export default {
    async index(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });

        return response.json(orphanageView.renderMany(orphanages));
    },

    async show(request: Request, response: Response) {
        const {id} = request.params;  // route params

        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return response.json(orphanageView.render(orphanage));
    },

    async create(request: Request, response: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = request.body;
    
        const orphanagesRepository = getRepository(Orphanage);

        const requestImages = request.files as Express.Multer.File[];
        
        const images = requestImages.map(image => {
            return {path: image.filename};
        });

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            images
        };

        const schema = Yup.object().shape({
            name: Yup.string().required('Nome é um campo obrigatório'),
            latitude: Yup.number().required('Latitude é um campo obrigatório'),
            longitude: Yup.number().required('Longitude é um campo obrigatório'),
            about: Yup.string().required('Sobre é um campo obrigatório').max(300),
            instructions: Yup.string().required('Instruções é um campo obrigatório'),
            opening_hours: Yup.string().required('Horário de funcionamento é um campo obrigatório'),
            open_on_weekends: Yup.boolean().required('Aberto nos finais de semana é um campo obrigatório'),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        });

        await schema.validate(data, {
            abortEarly: false,
        });
    
        const orphanage = orphanagesRepository.create(data);
    
        await orphanagesRepository.save(orphanage);
        
        return response.status(201).json(orphanage);
    }
};