import React from 'react';
import { Component } from 'react';
import { Input, Table } from 'antd';
import 'antd/dist/antd.css';
import { searchService } from '../services/searchService';
import './repo.css'

const { Search } = Input;

class Repo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                {
                    title: 'Title',
                    dataIndex: 'title',
                },
                {
                    title: 'Description',
                    dataIndex: 'description',
                },
                {
                    title: 'LastUpdated',
                    dataIndex: 'lastUpdated',
                },
            ],
            data: []
        }
    }


    getRepos = (username) => {
        let resData = [];
        if (username) {
            searchService.getSearchedRepo(username).then(
                function (res) {
                    console.log(res)

                    res && res.forEach((value) => {
                        resData.push({
                            title: value.name,
                            description: value.description,
                            lastUpdated: value.updated_at
                        });
                    })
                }, function (rej) {
                    console.log(rej);
                    resData=[];
                }
            ).then(() => {
                this.setState({
                    data: resData
                })
            })
        }

    }

    render() {
        const { columns, data } = this.state
        return (
            <div>

                <div>
                    <h1>Find Your Repo...</h1>
                    <div className='search-user'>
                        <Search
                            placeholder="input search text"
                            enterButton="Search"
                            size="large"
                            onSearch={value => this.getRepos(value)}
                        />
                    </div>
                    {data.length > 0 ?
                        <div className='repo-data'>
                            <Table columns={columns} dataSource={data} size="middle" />
                        </div>
                        : <div className="repo-empty">
                            <h1>No Data to Show</h1>
                        </div>
                    }
                </div>
            </div>

        )
    }

}

export default Repo;
