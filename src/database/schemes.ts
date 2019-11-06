import { db } from '../../knexfile';
import { Scheme } from '../models/Scheme';
import { Steps } from '../models/Steps';

export const find = async () => await db<Scheme>('schemes');

export const findById = async (id: string | number) => {
  const [scheme] = await db<Scheme>('schemes').where({ id });
  if (!scheme) throw new Error('404');
  return scheme;
};

export const findSteps = async (scheme_id: string | number) => {
  await findById(scheme_id);
  const steps = await db<Steps>('steps')
    .select('*')
    .from('steps')
    .join('schemes', { 'steps.scheme_id': 'schemes.id' })
    .where({ scheme_id });

  if (!steps.length) throw new Error('404');
  steps.forEach((step) => delete step.scheme_id);
  return steps;
};

export const add = async (body: Scheme) => {
  const [id] = await db<Scheme>('schemes').insert(body);
  return await findById(id);
};

export const addStep = async (body: Steps, scheme_id: string | number) => {
  await findById(scheme_id);
  const [id] = await db<Steps>('steps').insert({ ...body, scheme_id });
  return await db<Steps>('steps')
    .where({ id })
    .first();
};

export const update = async (body: Scheme, id: string | number) => {
  await findById(id);
  const count = await db<Scheme>('schemes')
    .where({ id })
    .update(body);
  if (!count) throw new Error('Did not update!');

  return await findById(body.id || id);
};

export const remove = async (id: string | number) => {
  const scheme = await findById(id);
  const count = await db<Scheme>('schemes')
    .where({ id })
    .del();
  if (!count) throw new Error('Did not remove!');

  return scheme;
};
