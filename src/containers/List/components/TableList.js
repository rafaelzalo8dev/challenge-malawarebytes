import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  TableContainer,
  StatusBar,
} from '../styledComponents';
const useStyles = makeStyles({
  container: {
      width: '90%',
      marginLeft: '5%',
  },
  header: {
    fontWeight: 'bold !important',
    fontSize: 20,
    width: '14%',
    maxWidth: '14%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  value: {
    fontSize: 16,
    width: '14%',
    maxWidth: '14%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  row: {
    display: 'flex',
    width: '100%',
  }
});

function CardList (props) {
  const classes = useStyles();
  const { entries, count, handleChangePage, page, rowsPerPage } = props;
  const fields = ['API', 'Description', 'Category', 'Link', 'Auth', 'HTTPS', 'Cors'];

  const visitURL = (link) => {
    window.open(link, '_blank');
  };

  return (
    <TableContainer className={classes.container}>
        <h4>Click on item to visit their link</h4>
        <TablePagination
          component="div"
          rowsPerPageOptions={[rowsPerPage]}
          count={count}
          rowsPerPage={rowsPerPage}
          page={page - 1}
          onPageChange={handleChangePage}
        />
        <Table>
          <TableHead>
            <TableRow className={classes.row}>
              {fields.map((column) => (
                <TableCell className={classes.header} key={column}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((item, index) => {
              if (item) return (
                <TableRow className={classes.row} hover onClick={() => visitURL(item.Link)} key={item.description}>
                {fields.map((column) => {
                  const value = item[column];
                  if (column === 'HTTPS') {
                    return (<TableCell className={classes.value} key={`${column}-${index}`} align={'center'}>
                      <StatusBar status={value}>{value}</StatusBar>
                    </TableCell>);
                  }
                  return (<TableCell className={classes.value} key={`${column}-${index}`} align={column.align}>
                      {value}
                    </TableCell>);
                })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
  );
}

CardList.propTypes = {
  entries: PropTypes.array,
  count: PropTypes.number,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  handleChangePage: PropTypes.func,
};

export default memo(CardList);

