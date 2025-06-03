import { Request, Response } from 'express';
import AgencyInfo from '../models/AgencyInfo';
import { AgencyInfo as AgencyInfoType } from '../types';

export const getAgencyInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    const agencyInfo = await AgencyInfo.findOne();
    if (!agencyInfo) {
      res.status(404).json({ message: 'Agency info not found' });
      return;
    }
    res.json(agencyInfo);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateAgencyInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    const agencyData: AgencyInfoType = req.body;
    
    const agencyInfo = await AgencyInfo.findOneAndUpdate(
      {},
      agencyData,
      { new: true, upsert: true }
    );
    
    res.json(agencyInfo);
  } catch (error) {
    res.status(400).json({ message: 'Error updating agency info', error });
  }
};