import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Snackbar, Button, Switch } from '@material-ui/core';
import Select from 'react-select';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { getEntries, getCategories } from './services';
import Loader from '../../components/Loader';

import TableList from './components/TableList';
import { Content } from './styledComponents';
import Input from '../../components/Input';
import { filter } from 'lodash';
const useStyles = makeStyles({
  btn: {
    fontWeight: 'bold',
    padding: '10px 30px',
    backgroundColor: 'black',
    cursor: 'pointer',
    color: 'white',
    '&:hover ': {
      backgroundColor: '#3cbfda',
      color: 'black',
    },
    marginBottom: 20,
  },
});
export default function List(props) {

  const [entries, setEntries] = useState([]);
  const [entriesTotal, setEntriesTotal] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState(null);
  const [descriptionText, setDescriptionText] = useState('');
  const [titleFilter, setTitleFilter] = useState('');
  const [httpsFilter, setHttpsFilter] = useState('');
  const [corsFilter, setCorsFilter] = useState(null);
  const [authFilter, setAuthFilter] = useState(null);

  const [filter, setFilter] = useState({
    description: '',
    category: '',
    https: null,
    cors: null,
    auth: null,
    title: '',
  });

  const [count, setCount] = useState(0);
  const DEFAULT_ROWS_PER_PAGE = 20;
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    text: '',
  });
  const classes = useStyles();

  useEffect(() => {
    async function fetchCategories () {
      try {
        setLoading(true);
        const categoriesResult = await getCategories();
        const categoriesOptions = categoriesResult.map(item => {
          return {
            value: item,
            label: item,
          };
        });
        setCategories(categoriesOptions);
      } catch (err) {
        setSnackbar({
          open: true,
          text: 'Error while trying to get categories',
          severity: 'error',
        });
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  const createFilterString = () => {
    const filterString = `?category=${filter.category}&description=${filter.description}&title=${filter.title}&https=${filter.https}`;
    console.log(filterString);
    return filterString;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setPage(0);
        const filterString = createFilterString();
        const result = await getEntries(filterString);
        setEntriesTotal(result.entries);
        setCount(result.count);
        setLoading(false);
        setSnackbar({
          open: true,
          text: 'Info loaded succesfully',
          severity: 'success',
        });
        setPage(1);
      } catch (err) {
        setLoading(false);
        setSnackbar({
          open: true,
          text: err,
          severity: 'error',
        });
      }
    }
    fetchData();
  }, [filter]);

  const setEntriesToDisplay = (page) => {
    const newEntries = [];
    for (let i = 0 + (page - 1) * DEFAULT_ROWS_PER_PAGE; i < page * DEFAULT_ROWS_PER_PAGE ; i += 1) {
      const item = entriesTotal[i];
      newEntries.push(item);
    }
    setEntries(newEntries);
  };

  useEffect(() => {
    if (entriesTotal && entriesTotal.length > 0 && page) {
      setEntriesToDisplay(page);
    }
    if (!entriesTotal) {
      setEntries([]);
    }
  }, [page]);

  const handleChangePage = (event, nextPage) => {
    setPage(nextPage + 1);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, text: '' });
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleChangeCategory = (item) => {
    setCategorySelected(item);
  };

  const applyFilters = () => {
    setFilter({
      ...filter,
      description: descriptionText,
      title: titleFilter,
      category: categorySelected ? categorySelected.value.split(' ')[0] : '',
      https: httpsFilter,
    });
  };

  return (
    <Content>
      <Helmet>
        <title>Entries List</title>
      </Helmet>
      <h3>List</h3>
      <h4>Filters</h4>
      <div>
        <Select
          options={categories}
          name="period-type"
          menuPlacement="bottom"
          menuPosition="fixed"
          placeholder="Select a category"
          value={categorySelected}
          onChange={handleChangeCategory}
        />
      </div>
      <div>
        <Input
          value={titleFilter}
          placeholder="Filter by title"
          onChange={(e) => { setTitleFilter(e.target.value) }}
        />
      </div>
      <div>
        <Input
          value={descriptionText}
          placeholder="Filter by description"
          onChange={(e) => { setDescriptionText(e.target.value) }}
        />
      </div>
      <div>
        <label>Https: </label>
        <Switch 
          checked={httpsFilter}
          onChange={(e) => setHttpsFilter(e.target.checked)}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </div>
      <div>
        <Button className={classes.btn} onClick={() => applyFilters()}>
          Apply filter
        </Button>
        <Button className={classes.btn} onClick={() => {
          setDescriptionText('');
          setTitleFilter('');
          setCategorySelected(null);
          setHttpsFilter('');
          setFilter({
            category: '',
            description: '',
            title: '',
            https: null,
          });
        }}>
          Clear Filters
        </Button>
      </div>
      {!loading && entries && entries.length > 0 &&
        <TableList 
          count={count}
          entries={entries}
          page={page}
          rowsPerPage={DEFAULT_ROWS_PER_PAGE}
          handleChangePage={handleChangePage}
        />
      }
      {!loading && entries && entries.length === 0 &&
        <div>There isnt any entries with filters selected</div>
      }
      { loading && <Loader />}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.text}
        </Alert>
      </Snackbar>
    </Content>
  );
}
