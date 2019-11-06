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

  steps.forEach((step) => delete step.scheme_id);
  return steps;
};
