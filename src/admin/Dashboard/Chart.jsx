import chart from "../../asstes/chart.jpg";
function Chart() {
    return ( 
        <div className="bg-[#1B1B1B] p-[20px] rounded-[20px]">
            <h2 className="font-manrope text-[600] text-white text-[24px] mb-[15px]">Payment Statics</h2>
            <img src={chart} alt="chart" />
        </div> 
    );
}

export default Chart;