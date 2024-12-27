import { MdCake } from "react-icons/md";
import { Link } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";


function Package({ packages }) {

    const truncateText = (text, wordLimit) => {
        if (!text) return '';
        const words = text.split(' ');
        return words.length > wordLimit ? words?.slice(0, wordLimit)?.join(' ') + '...' : text;
    };
    return (
        <>
            <div className="w-full  bg-[#1B1B1B] rounded-[20px]">
                <h2 className="font-manrope font-[600] text-white text-[18px] md:text-[24px] mb-[15px]">Packages</h2>
                {packages?.map((item, index) => (
                    <div key={index} className="flex items-center justify-between gap-[10px] w-full border border-[#404040] rounded-[10px] p-[15px] mb-[15px]">
                        <div className="flex items-start gap-[13px] w-[90%] ">
                            <div className="flex gap-[10px] items-center justify-center rounded-[5px] w-[38px] min-w-[38px] h-[38px] 
                        md:w-[40px] md:h-[40px] lg:w-[45px] lg:h-[45px] xl:w-[60px] xl:h-[60px] bg-[#302F2F]">
                                {item?.package_image ? (
                                    <img src={item?.package_image} alt="package" />
                                ) : (
                                    <MdCake className="text-[#EB3465] text-[25px]" />
                                )}
                            </div>
                            <div className="flex flex-col w-[80%]">
                                <h2 className="max-w-[180px] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[80%]  whitespace-nowrap  text-ellipsis overflow-hidden font-manrope text-white text-[18px] leading-[18px] md:text-[18px] md:leading-[18px] lg:text-[18px] lg:leading-[20px] xl:text-[18px] xl:leading-[28px] ">
                                    {truncateText(item?.package_name, 10)}
                                </h2>
                                <div className="flex flex-wrap items-center w-[80%]">
                                    {item?.package_services?.map((category, index) => (
                                        <span className="flex items-center  font-manrope text-[#ffffff59] text-[600] uppercase text-[11px] leading-[22px] mr-[8px]">{category?.services_provider_categries} ,</span>
                                    ))}</div>
                            </div>
                        </div>

                        <div className="w-[10%] text-center flex items-center justify-center">
                            <Link to={`/access-admin/package/${item?._id}`}>
                                <MdOutlineRemoveRedEye size={24} className="text-white " />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Package;