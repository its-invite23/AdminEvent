import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Listing from '../../Api/Listing';

function Chart() {
    const[data ,setData] = useState([]);
  const [Loading, setLoading] = useState(false);

    // const data = [
    //     { name: 'Jan', Failed: 200, Successful: 240, Pending: 240 },
    //     { name: 'Feb', Failed: 200, Successful: 139, Pending: 221 },
    //     { name: 'Mar', Failed: 200, Successful: 150, Pending: 229 },
    //     { name: 'April', Failed: 208, Successful: 180, Pending: 200 },
    //     { name: 'May', Failed: 189, Successful: 150, Pending: 218 },
    //     { name: 'June', Failed: 239, Successful: 200, Pending: 250 },
    //     { name: 'July', Failed: 250, Successful: 180, Pending: 210 },
    //     { name: 'Aug', Failed: 189, Successful: 150, Pending: 218 },
    //     { name: 'Sep', Failed: 239, Successful: 200, Pending: 250 },
    //     { name: 'Oct', Failed: 250, Successful: 180, Pending: 210 },
    //     { name: 'Nov', Failed: 239, Successful: 200, Pending: 250 },
    //     { name: 'Dec', Failed: 250, Successful: 180, Pending: 210 },
    // ];
    const Chart = () => {
        setLoading(true);
        const main = new Listing();
        main.chartGet()
          .then((r) => {
            console.log("respose ", r)
            setLoading(false);
            setData(r?.data);
          })
          .catch((err) => {
            setLoading(false);
            setData([]);
            console.log("error", err);
          });
      };
    
      useEffect(() => {
        Chart();
      }, []);
    return (
        <div className="w-full  flex flex-col bg-!gray-800 relative -z-![0] ">
            <h2 className="font-manrope font-[600] text-white text-left text-[18px] md:text-[24px] mb-[15px]">Payment Statics</h2>
            <ResponsiveContainer width="100%" height={300} className="text-white relative -z-0">
                <BarChart data={data} className="relative -z-1">
                    <XAxis dataKey="name" tick={{ fill: '#FFFFFF' }} />
                    <YAxis domain={['auto', 'auto']} tick={{ fill: '#FFFFFF' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Failed" fill="#D95858" name="Failed" />
                    <Bar dataKey="Successful" fill="#4CAF50" name="Successful" />
                    <Bar dataKey="Pending" fill="#B8A955" name="Pending" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Chart;

