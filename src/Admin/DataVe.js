import React, { useState, useEffect, Fragment } from 'react';
import { Tabs, Radio, message } from 'antd';
import axios from 'axios';
import Menuview from './menu'
import UserView from './User'

import { Line, Bar, Pie } from 'react-chartjs-2';

export default function DataVe() {

    const { TabPane } = Tabs;
    const [optionValueType, setOptionValueType] = useState(0);
    const [optionValueTime, setOptionValueTime] = useState(0);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Doanh thu',
                data: [],
                backgroundColor: 'rgb(236, 150, 52)',
                borderWidth: 2,
            }
        ]
    });

    function LayDataDoanhThuTuanNay() {
        let res = axios.get('http://localhost:9999/get-money-data-in-week')
            .then(res => {
                if (res.data.status === "success") {
                    var chartDataa =
                    {
                        labels: res.data.dataDate,
                        datasets:
                            [
                                {
                                    label: 'Doanh thu vé hủy',
                                    data: res.data.dataDoanhThuHuy,
                                    backgroundColor: 'rgb(39, 136, 201)',
                                    borderWidth: 2
                                },
                                {
                                    label: 'Doanh thu',
                                    data: res.data.dataDoanhThu,
                                    backgroundColor: 'rgb(236, 150, 52)',
                                    borderWidth: 2
                                }
                                
                            ]
                    }
                } setChartData(chartDataa);
            })
    }
    function LayDataDoanhThuThangNay() {
        let res = axios.get('http://localhost:9999/get-money-data-in-month')
            .then(res => {
                if (res.data.status === "success") {
                    var chartDataa =
                    {
                        labels: res.data.dataDate,
                        datasets:
                            [
                                {
                                    label: 'Doanh thu vé hủy',
                                    data: res.data.dataDoanhThuHuy,
                                    backgroundColor: 'rgb(39, 136, 201)',
                                    borderWidth: 2,
                                    
                                    
                                },
                                {
                                    label: 'Doanh thu vé',
                                    data: res.data.dataDoanhThu,
                                    backgroundColor: 'rgb(236, 150, 52)',
                                    borderWidth: 2,
                                   
                                }
                                
                            ]

                    }
                } setChartData(chartDataa);
            })
    }
    async function LayDataSoVeTuanNay() {
        let res = await axios.get('http://localhost:9999/get-ticket-data-in-week')
        if (res.data.status === "success") {
            var chartDataa =
            {
                labels: res.data.dataDate,
                datasets:
                    [
                        {
                            label: 'Số vé bán',
                            data: res.data.dataSoVe,
                            backgroundColor: 'rgb(236, 150, 52)',
                            borderWidth: 2
                        },
                        {
                            label: 'Số vé hủy',
                            data: res.data.dataSoVeHuy,
                            backgroundColor: 'rgb(39, 136, 201)',
                            borderWidth: 2
                        }
                    ]
            }
            setChartData(chartDataa);
        } else {
            message.error("Lấy data thất bại")
        }
    }
    async function LayDataSoVeThangNay() {
        let res = await axios.get('http://localhost:9999/get-ticket-data-in-month')

        if (res.data.status === "success") {
            var chartDataa =
            {
                labels: res.data.dataDate,
                datasets:
                    [
                        {
                            label: 'Số vé bán',
                            data: res.data.dataSoVe,
                            backgroundColor: 'rgb(236, 150, 52)',
                            borderWidth: 2
                        },
                        {
                            label: 'Số vé hủy',
                            data: res.data.dataSoVeHuy,
                            backgroundColor: 'rgb(39, 136, 201)',
                            borderWidth: 2
                        }
                    ]
            }
            setChartData(chartDataa);
        } else {
            message.error("Lấy data thất bại")
        }
    }

    useEffect(() => {
        LayDataDoanhThuTuanNay();
    }, [])

    useEffect(() => {
        if (optionValueTime === 0 && optionValueType === 0) {
            LayDataDoanhThuTuanNay();
        }
        if (optionValueTime === 1 && optionValueType === 0) {
            LayDataDoanhThuThangNay();
        }
        if (optionValueTime === 0 && optionValueType === 1) {
            LayDataSoVeTuanNay();
        }
        if (optionValueTime === 1 && optionValueType === 1) {
            LayDataSoVeThangNay();
        }

    }, [optionValueType])

    useEffect(() => {
        if (optionValueTime === 0 && optionValueType === 0) {
            LayDataDoanhThuTuanNay();
        }
        if (optionValueTime === 1 && optionValueType === 0) {
            LayDataDoanhThuThangNay();
        }
        if (optionValueTime === 0 && optionValueType === 1) {
            LayDataSoVeTuanNay();
        }
        if (optionValueTime === 1 && optionValueType === 1) {
            LayDataSoVeThangNay();
        }

    }, [optionValueTime])



    return (
        <div className="d-fix">
            <Menuview />
            <div className="menu-bodername">
                <UserView stagUrl={"Chi tiết thống kê"} />
                <div className="cover-table-rev">
                    <div>
                        <div className='col colwh'>
                            <br></br>
                            <div className="Khungg">
                                <div className="tk30" >Chọn thông số thống kê
                                    <Radio.Group value={optionValueType} onChange={(e) => { setOptionValueType(e.target.value); }}>
                                        <Radio.Button value={0} className="rbtn">Theo doanh thu</Radio.Button>
                                        <Radio.Button value={1} className="rbtn">Theo số vé bán được</Radio.Button>
                                    </Radio.Group>
                                </div>
                                <br></br>
                                <div className="tk7" >Chọn thời gian thống kê
                                    <Radio.Group value={optionValueTime} onChange={(e) => { setOptionValueTime(e.target.value); }}>
                                        <Radio.Button value={0} className="rbtn" >Tuần này</Radio.Button>
                                        <Radio.Button value={1} className="rbtn">Tháng này</Radio.Button>
                                    </Radio.Group>
                                </div>
                            </div>
                            <br></br>
                            <br></br>
                            <div className="chartt">
                                <div style={{ height: 600, width: 1200 }}>
                                    <Line data={chartData} options={{
                                        responsive: true,
                                        title: {
                                            text: 'BIỂU ĐỒ MIỀN', display: true
                                        },
                                        scales: {
                                            yAxes: [
                                                {
                                                    ticks: {
                                                        autoSkip: true,
                                                        maxTicksLimit: 10,
                                                        beginAtZero: true
                                                    },
                                                    gridLines: {
                                                        display: false,

                                                    }
                                                }
                                            ],
                                            xAxes: [
                                                {
                                                    gridLines: {
                                                        display: false
                                                    }
                                                }
                                            ]
                                        }
                                    }}></Line>
                                </div>
                                <br></br><br></br>
                                <br></br><br></br>
                                <div style={{ height: 600, width: 1200 }}>
                                    <Bar data={chartData} options={{
                                        responsive: true,
                                        title: {
                                            text: 'BIỂU ĐỒ CỘT', display: true
                                        },
                                        scales: {
                                            yAxes: [
                                                {
                                                    ticks: {
                                                        autoSkip: true,
                                                        maxTicksLimit: 10,
                                                        beginAtZero: true
                                                    },
                                                    gridLines: {
                                                        display: false,

                                                    }
                                                }
                                            ],
                                            xAxes: [
                                                {
                                                    gridLines: {
                                                        display: false
                                                    }
                                                }
                                            ]
                                        }
                                    }}></Bar>
                                </div>
                                <br></br><br></br>
                                <br></br><br></br>
                                <div style={{ height: 600, width: 1200 }}>
                                    <Pie data={chartData} options={{
                                        responsive: true,
                                        title: {
                                            text: 'BIỂU ĐỒ TRÒN', display: true
                                        }
                                    }}></Pie>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

