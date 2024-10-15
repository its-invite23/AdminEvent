import { MdCake } from "react-icons/md";
import { Link } from "react-router-dom";
import { AiOutlineDash } from "react-icons/ai";

function Package() {
    return (
        <div className="w-full  bg-[#1B1B1B] p-[20px] rounded-[20px]">
            <h2 className="font-manrope text-[600] text-white text-[24px] mb-[15px]">Payment Statics</h2>
            <div className="flex items-center justify-between gap-[10px] w-full border border-[#404040] rounded-[10px] p-[15px] mb-[15px]">
                <div className="flex items-center gap-[13px] ">
                    <div className="flex w-full gap-[10px] items-center justify-center rounded-[5px] w-[56px] h-[56px] bg-[#302F2F]">
                        <MdCake className="text-[#EB3465] text-[25px]" />
                    </div>
                    <div>
                        <h2 className="font-manrope text-white text-[22px] leading-[22px]">Birthday party</h2>
                        <div>
                            <span className="font-manrope text-[#ffffff59] text-[600] uppercase text-[11px] leading-[22px] mr-[8px]">Catering ,</span>
                            <span className="font-manrope text-[#ffffff59] text-[600] uppercase text-[11px] leading-[22px]">Activity</span>
                        </div>
                    </div>
                </div>

                <div>
                    <Link to={"/"}>
                    <AiOutlineDash className="text-white text-[20px]" />
                    </Link>
                </div>
            </div>

            <div className="flex items-center justify-between gap-[10px] w-full border border-[#404040] rounded-[10px] p-[15px] mb-[15px]">
                <div className="flex items-center gap-[13px] ">
                    <div className="flex w-full gap-[10px] items-center justify-center rounded-[5px] w-[56px] h-[56px] bg-[#302F2F]">
                        <MdCake className="text-[#EB3465] text-[25px]" />
                    </div>
                    <div>
                        <h2 className="font-manrope text-white text-[22px] leading-[22px]">Birthday party</h2>
                        <div>
                            <span className="font-manrope text-[#ffffff59] text-[600] uppercase text-[11px] leading-[22px] mr-[8px]">Catering ,</span>
                            <span className="font-manrope text-[#ffffff59] text-[600] uppercase text-[11px] leading-[22px]">Activity</span>
                        </div>
                    </div>
                </div>

                <div>
                    <Link to={"/"}>
                    <AiOutlineDash className="text-white text-[20px]" />
                    </Link>
                </div>
            </div>

            <div className="flex items-center justify-between gap-[10px] w-full border border-[#404040] rounded-[10px] p-[15px]">
                <div className="flex items-center gap-[13px] ">
                    <div className="flex w-full gap-[10px] items-center justify-center rounded-[5px] w-[56px] h-[56px] bg-[#302F2F]">
                        <MdCake className="text-[#EB3465] text-[25px]" />
                    </div>
                    <div>
                        <h2 className="font-manrope text-white text-[22px] leading-[22px]">Birthday party</h2>
                        <div>
                            <span className="font-manrope text-[#ffffff59] text-[600] uppercase text-[11px] leading-[22px] mr-[8px]">Catering ,</span>
                            <span className="font-manrope text-[#ffffff59] text-[600] uppercase text-[11px] leading-[22px]">Activity</span>
                        </div>
                    </div>
                </div>

                <div>
                    <Link to={"/"}>
                    <AiOutlineDash className="text-white text-[20px]" />
                    </Link>
                </div>
            </div>
        </div>);
}

export default Package;