import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
const SamplePage = () => {
    const pageUrl = "weatherforecast/";
    const axiosPrivate = useAxiosPrivate();

    // List of page data
    const [dataList, setDataList] = useState<any[]>([]);

    useEffect(() => {
        getDataList();
    }, []);

    // method to get all categories
    const getDataList = async (pageNum = 1) => {
        try {
            const response = await axiosPrivate.get(pageUrl);
            setDataList(response.data);
        } catch (error) {
            console.log(error);
            return;
        }
    };

    return (
        <>
            <table className="table table-striped table-bordered table-hover table-sm">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp C</th>
                        <th>Temp F</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {dataList.map((item, index) => (
                        <tr key={index}>
                            <td>{item.date}</td>
                            <td>{item.temperatureC}</td>
                            <td>{item.temperatureF}</td>
                            <td>{item.summary}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default SamplePage;
