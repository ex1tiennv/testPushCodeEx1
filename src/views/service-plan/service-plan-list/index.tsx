import { useListPlan } from '@/stores/service-plan/hooks'
import PlanItem from './plan-card'

import Sliders from 'react-slick'

const PlanList = ({ add }: { add?: boolean }) => {
    const { planState } = useListPlan()

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        className: 'center',
        customPaging: function () {
            return <div className="dot"></div>
        },
        dotsClass: 'slick-dots slick-thumb',
    }

    return (
        <div className="mx-auto w-[1100px]">
            <Sliders {...settings} className="">
                {planState?.planList.map((item) => (
                    <div key={item.id} className="px-[12px] py-[32px]">
                        <PlanItem
                            key={item.id}
                            id={item.id}
                            planName={item.planName}
                            description={item.description}
                            maxMeeting={item.maxMeeting}
                            maxShareholderAccount={item.maxShareholderAccount}
                            maxStorage={item.maxStorage}
                            price={item.price}
                            isRecommended={false}
                            className="mx-auto w-[320px]"
                            add={add}
                        />
                    </div>
                ))}
            </Sliders>
        </div>
    )
}

export default PlanList
