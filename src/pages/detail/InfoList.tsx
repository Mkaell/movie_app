import React, { FC } from 'react'
import InfoItem from './InfoItem'
import PaidIcon from '@mui/icons-material/Paid';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ShutterSpeedIcon from '@mui/icons-material/ShutterSpeed';

interface IInfoList {
    children?: React.ReactNode;
    item: any;
}

const InfoList: FC<IInfoList> = ({ item }) => {
    return (
        <>
            {

                <>

                    {item.release_date &&
                        <InfoItem icon={<DateRangeIcon />} title='Release date: ' info={item.release_date} />}
                    {item.runtime ?
                        <InfoItem icon={<ShutterSpeedIcon />} title='Duration: ' info={item.runtime + 'm'} /> : null}

                    {item.budget ?
                        <InfoItem icon={<PaidIcon />} title='Budget: $' info={item.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} /> : null}
                    {item.first_air_date && item.last_air_date ?
                        <InfoItem icon={<DateRangeIcon />} info={`${item.first_air_date} - ${item.last_air_date}`} />
                        : null}
                    {item.number_of_episodes &&
                        <InfoItem title='Number of episodes: ' info={item.number_of_episodes} />}
                    {item.number_of_seasons &&
                        <InfoItem title='Number of seasons: ' info={item.number_of_seasons} />}

                </>
            }
        </>

    )
}

export default InfoList