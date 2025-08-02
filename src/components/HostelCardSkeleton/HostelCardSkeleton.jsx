import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/material';
import "./HostelCardSkeleton.css"

function HostelCardSkeleton() {

    return (
        <div className='skeleton-main-container'>
            {Array.from(new Array(8)).map((item,index) => (
                <Box key={index} sx={{ width: 250, margin:"14px"}} >
                    <Skeleton variant="rounded" width={250} height={160} className="skeleton-img"/>
                    <Skeleton variant="text" width={250} height={30} />
                    <Skeleton variant="text" width={120} height={20} />
                </Box>
          ))}
        </div>
    );
}

export default HostelCardSkeleton

