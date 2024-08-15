import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  // validate if user is authenticated
  await request.jwtVerify({ onlyCookie: true })

  const accessToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '7d',
      },
    },
  )

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true, // front-end can't read the token value as a primitive
      sameSite: true,
      httpOnly: true, // can only be access by the back-end.
    })
    .status(200)
    .send({
      accessToken,
    })
}
