import React from "react";
import { useTable } from "react-table";
import { Row, Col, Table, Pagination } from "react-bootstrap";
import { pageLimitOptions } from "../../common/constants/options";
import Select from "react-select";

export const HRMTable = ({ columns, data, onUpdateFilter, filters }) => {
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    useTable({ data: data?.docs || [], columns });

  const onPageChange = (event) => {
    onUpdateFilter({ ...filters, page: event });
  };

  const onLimitChange = (event) => {
    onUpdateFilter({ ...filters, limit: event?.value });
  };

  return (
    <React.Fragment>
      <Row>
        <Col sm={12} md={6}>
          <div className="d-flex align-items-baseline mb-2">
            <span>Show</span>
            <Select
              className="px-2"
              options={pageLimitOptions}
              defaultValue={pageLimitOptions[0]}
              onChange={onLimitChange}
            />
            <span>Entries</span>
          </div>
        </Col>
        <Col sm={12} md={6}></Col>
      </Row>
      <Row>
        <Col sm={12}>
          <Table
            responsive
            striped
            className="custom-table datatable"
            {...getTableProps()}
          >
            <thead>
              {headerGroups.map((headerGroup, index) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th key={index} scope="col" {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, index) => {
                prepareRow(row);
                return (
                  <tr key={index} {...row.getRowProps()}>
                    {row.cells.map((cell, index) => (
                      <td key={index}>{cell.render("Cell")}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
        <Col sm={12} md={5}>
          <div>
            Showing {data?.totalDocs ? data?.pagingCounter : 0}
            {} to{" "}
            {data?.totalDocs
              ? data?.page * data?.limit < data?.totalDocs
                ? data?.page * data?.limit
                : data?.totalDocs
              : 0}{" "}
            of {data?.totalDocs} entries
          </div>
        </Col>
        <Col sm={12} md={7}>
          {data?.totalDocs ? (
            <Pagination className="justify-content-end">
              <Pagination.Prev
                disabled={!data?.hasPrevPage}
                onClick={onPageChange.bind(this, data?.page - 1)}
              >
                Previous
              </Pagination.Prev>
              {Array.from({ length: data?.totalPages }, (v, k) => k + 1).map(
                (item, index) => (
                  <Pagination.Item
                    active={item === data?.page ? true : false}
                    key={index}
                    onClick={onPageChange.bind(this, item)}
                  >
                    {item}
                  </Pagination.Item>
                )
              )}
              <Pagination.Next
                disabled={!data?.hasNextPage}
                onClick={onPageChange.bind(this, data?.page + 1)}
              >
                Next
              </Pagination.Next>
            </Pagination>
          ) : null}
        </Col>
      </Row>
    </React.Fragment>
  );
};
