import "./table.scss";

import Prototypes from "prop-types";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";

// We need to wrap component in `forwardRef` in order to gain
// access to the ref object that is assigned using the `ref` prop.
// This ref is passed as the second parameter to the function component
export const Table = forwardRef((props, ref) => {

    const [data, setData] = useState({
        page: 1,
        perPage: 6,
        total: 0,
        totalPages: 0,
        data: [],
        loaded: false,
        refresh: false,
    });

    // Get User List on page load and when page number changed
    useEffect(() => {
        const loadData = async () => {
            // retrive from api
            const response = await props.loadDataFunc(data.page, data.perPage);
            // set data to state
            setData({ ...response, loaded: true, refresh: data.refresh });
        };
        loadData();
    }, [data.page, data.refresh]);

    
    // The component instance will be extended
    // with whatever you return from the callback passed
    // as the second argument
    useImperativeHandle(ref, () => ({

        refreshData() {
            setData({ ...data, refresh: !data.refresh });
        }

    }));



    // render header
    const renderHeader = () => {
        return props.children && props.children.map((x, index) =>
            <th width={x.props.width} key={index}>{x.props.header}</th>
        );
    }

    // render body, show data or template in cells
    const renderBody = () => {
        return props.children && data.data.map((row, rowIndex) => (
            <tr key={rowIndex}>
                {
                    props.children.map((cell, cellIndex) => {
                        if (!cell.props.template) {
                            const text = cell.props.text || row[cell.props.data];
                            if (!cell.props.onClick)
                                return <td key={cellIndex}>{text}</td>
                            else {
                                return <td key={cellIndex}>
                                    <a onClick={() => cell.props.onClick(row[cell.props.data])}>{text}</a>
                                </td>
                            }
                        }
                        else {
                            const template = { ...cell.props.template };
                            const props = {};
                            for (let key in template.props) {
                                if (template.props[key][0] === "$") props[key] = row[template.props[key].substr(1)];
                                else props[key] = template.props[key];
                            }
                            template.props = props;
                            return <td key={cellIndex}>{template}</td>
                        }
                    })
                }
            </tr>
        ));
    }

    // create pagination, shows maximum of 10 page button
    const renderPagination = () => {
        const pageNos = 10;
        let minPage = 1;
        if (data.page > pageNos) minPage = data.page - (pageNos / 2);

        let maxPage = minPage + pageNos - 1;
        if (maxPage > data.totalPages) {
            minPage -= maxPage - data.totalPages;
            maxPage = minPage + pageNos - 1;
        }

        minPage = minPage > 0 ? minPage : 1;
        maxPage = maxPage <= data.totalPages ? maxPage : data.totalPages;

        const result = [
            <li key={-1}><a onClick={() => setData({ ...data, page: 1 })} > &laquo; </a></li>
        ];

        for (let index = minPage; index <= maxPage; index++) {
            result.push(<li key={index}><a onClick={() => setData({ ...data, page: index })} > {index}</a></li>);
        }

        result.push(<li key={-2}><a onClick={() => setData({ ...data, page: data.totalPages })} > &raquo; </a></li>);

        return result;
    }

    // show entites numbers and page info
    const renderFooter = () => {
        return (
            <tr>
                <td colSpan={props.children.length}>
                    <div className="table-footer">
                        <span className="pagination-info">
                            Page {data.page} of {data.totalPages} - {data.total} entities
                        </span>
                        <ul className="pagination">
                            {renderPagination()}
                        </ul>
                    </div>
                </td>
            </tr>
        );
    }

    return (
        <table className="table">
            {
                data.loaded &&
                <>
                    <thead>
                        <tr>{renderHeader()}</tr>
                    </thead>
                    <tbody>
                        {renderBody()}
                    </tbody>
                    <tfoot>
                        {renderFooter()}
                    </tfoot>
                </>
            }
            {
                !data.loaded &&
                <tbody>
                    <tr>
                        <td>
                            Loading Data...
                        </td>
                    </tr>
                </tbody>
            }
        </table>
    )
});

Table.protoTypes = {
    loadDataFunc: Prototypes.func.isRequired
};