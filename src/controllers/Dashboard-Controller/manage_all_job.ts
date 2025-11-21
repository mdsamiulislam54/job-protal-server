import { Request, Response, NextFunction } from "express";
import JobsModel from "../../models/JobModel/jobModel";

export const ManageAllJobs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const filterData = req.query.sort || 'all';
       
        let query: any = {};
        let sortOption: any = { postedDate: -1 }; // default latest sort
      
        // const filterType =
        //     filterData.pending ? "pending" :
        //         filterData.accepts ? "accepts" :
        //             filterData.latest ? "latest" :
        //                 filterData.old ? "old" :
        //                     filterData.lowPrice ? "lowPrice" :
        //                         filterData.highPrice ? "highPrice" :
        //                             "default"


        // SWITCH START
        switch (filterData) {
            case "pending":
                query.status = "pending";
                break;

            case "accepts":
                query.status = "accepted";
                break;

            case "latest":
                sortOption = { createdAt: -1 };
                break;

            case "old":
                sortOption = { createdAt: 1 };
                break;

            case "lowPrice":
                sortOption = { "salaryRange.min": 1 };
                break;

            case "highPrice":
                sortOption = { "salaryRange.max": -1 };
                break;

            default:
                
                query = {};
                sortOption = { postedDate: -1 };
                break;
        }
        // SWITCH END

        const [jobs, total] = await Promise.all([
            JobsModel.find(query)
                .sort(sortOption)
                .skip((page - 1) * limit)
                .limit(limit),
            JobsModel.countDocuments(query),
        ]);


        const jobsData = jobs.map((item: any) => ({
            _id: item._id,
            salaryRange: `৳ ${item.salaryRange.min} — ${item.salaryRange.max}`,
            title: item.title,
            logo: item.companyLogo,
            postedDate: item.postedDate,
            deadline: item.deadline,
            jobType: item.jobType,
            location: item.location,
            status: item.status,
        }));

        res.status(200).send({
            jobs: jobsData,
            page,
            totalPages: Math.ceil(total / limit),
        });

    } catch (error) {
        next(error);
    }
};
