import chart from "../../asstes/chart.jpg";
function Chart() {
    return ( 
        <div className="">
            <h2 className="font-manrope font-[600] text-white text-[18px] md:text-[24px] mb-[15px]">Payment Statics</h2>
            <img src={chart} alt="chart" />
        </div> 
    );
}

export default Chart;