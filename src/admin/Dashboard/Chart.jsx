import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Chart() {
    const data = [
        { name: 'Jan', Failed: 200, Successful: 240, Pending: 240 },
        { name: 'Feb', Failed: 200, Successful: 139, Pending: 221 },
        { name: 'Mar', Failed: 200, Successful: 150, Pending: 229 },
        { name: 'April', Failed: 208, Successful: 180, Pending: 200 },
        { name: 'May', Failed: 189, Successful: 150, Pending: 218 },
        { name: 'June', Failed: 239, Successful: 200, Pending: 250 },
        { name: 'July', Failed: 250, Successful: 180, Pending: 210 },
        { name: 'Aug', Failed: 189, Successful: 150, Pending: 218 },
        { name: 'Sep', Failed: 239, Successful: 200, Pending: 250 },
        { name: 'Oct', Failed: 250, Successful: 180, Pending: 210 },
        { name: 'Nov', Failed: 239, Successful: 200, Pending: 250 },
        { name: 'Dec', Failed: 250, Successful: 180, Pending: 210 },
    ];

    return (
        <div className="w-full  flex flex-col bg-!gray-800 z-[0] relative">
            <h2 className="font-manrope font-[600] text-white text-left text-[18px] md:text-[24px] mb-[15px]">Payment Statics</h2>
            <ResponsiveContainer width="100%" height={300} >
                <BarChart data={data} >
                    <XAxis dataKey="name" />
                    <YAxis domain={['auto', 'auto']} />
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

