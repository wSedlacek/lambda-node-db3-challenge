import { Router } from 'express';

import { find, findById, findSteps, add, addStep, update, remove } from '../database/schemes';

export const schemeRouter = Router();

schemeRouter.get('/', async (req, res) => {
  try {
    const schemes = await find();
    res.json(schemes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get schemes' });
  }
});

schemeRouter.get('/:id', async ({ params: { id } }, res) => {
  try {
    const scheme = await findById(id);
    res.json(scheme);
  } catch (err) {
    if (err.toString() === '404')
      res.status(404).json({ message: 'Could not find scheme with given id.' });
    else res.status(500).json({ message: 'Failed to get schemes' });
  }
});

schemeRouter.get('/:id/steps', async ({ params: { id } }, res) => {
  try {
    const steps = await findSteps(id);
    if (!steps.length) throw new Error('404');
    res.json(steps);
  } catch (err) {
    if (err.toString() === '404')
      res.status(404).json({ message: 'Could not find steps for given scheme' });
    else res.status(500).json({ message: 'Failed to get steps' });
  }
});

schemeRouter.post('/', async ({ body }, res) => {
  try {
    const scheme = await add(body);
    res.status(201).json(scheme);
  } catch {
    res.status(500).json({ message: 'Failed to create new scheme' });
  }
});

schemeRouter.post('/:id/steps', async ({ body, params: { id } }, res) => {
  try {
    const step = await addStep(body, id);
    res.status(201).json(step);
  } catch (err) {
    if (err.toString() === '404')
      res.status(404).json({ message: 'Could not find scheme with given id.' });
    else res.status(500).json({ message: 'Failed to create new step' });
  }
});

schemeRouter.put('/:id', async ({ body, params: { id } }, res) => {
  try {
    const scheme = await update(body, id);
    res.json(scheme);
  } catch (err) {
    if (err.toString() === '404')
      res.status(404).json({ message: 'Could not find scheme with given id' });
    else res.status(500).json({ message: 'Failed to update scheme' });
  }
});

schemeRouter.delete('/:id', async ({ params: { id } }, res) => {
  try {
    const deleted = await remove(id);
    res.json({ removed: deleted });
  } catch (err) {
    if (err.toString() === '404')
      res.status(404).json({ message: 'Could not find scheme with given id' });
    else res.status(500).json({ message: 'Failed to delete scheme' });
  }
});
