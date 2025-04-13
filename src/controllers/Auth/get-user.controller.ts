import { Request, Response, RequestHandler } from 'express';
import User from '../../models/Auth/user';
import { AuthRequest } from '../../types/request.interface';

export const getUserDetails: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Find user and populate business details
    const user = await User.findById((req as unknown as AuthRequest).user.id)
      .select('-password') // Exclude password from the response
      .populate('business.branches'); // Populate the embedded branches of the business

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    // Respond with user and business details
    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        email: user.email,
        name: user.name,
        business: {
          name: user.business.name,
          type: user.business.type,
          registrationNumber: user.business.registrationNumber,
          contactDetails: user.business.contactDetails,
          website: user.business.website,
          branches: user.business.branches.map((branch: { name: any; address: any; city: any; postalCode: any; contactDetails: any; servicesOffered: any; }) => ({
            name: branch.name,
            address: branch.address,
            city: branch.city,
            postalCode: branch.postalCode,
            contactDetails: branch.contactDetails,
            servicesOffered: branch.servicesOffered,
          })),
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user details',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
