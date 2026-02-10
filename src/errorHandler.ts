import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

export const errorHandler = (
    error: FastifyError,
    request: FastifyRequest,
    reply: FastifyReply,
) => {
    
    const statusCode = error.statusCode ?? 500;

    if (statusCode == 400) {
        reply.status(400).send({
            error: {
                message: 'Bad Request',
                details: error.validation,
            },
        });
        return;
    }
    else {
        request.log.error(error);
    }

};
