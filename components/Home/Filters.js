import React, { useState, useEffect, useRef } from 'react'
import Cached from '@material-ui/icons/Cached'
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers'
import MomentUtils from '@date-io/moment'
import { useQuery } from 'react-apollo-hooks'
import { ALL_GENRE_QUERY } from '../Queries/Genres'
//MUI
import {
  TextField,
  Checkbox,
  Tooltip,
  FormControlLabel,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core'
import { Check, ExpandMore } from '@material-ui/icons'
import withStyles from '@material-ui/core/styles/withStyles'
//styled components
import Accordion from '../../styledComponents/Accordion/Accordion.jsx'
import Clearfix from '../../styledComponents/Clearfix/Clearfix.jsx'
import Card from '../../styledComponents/Card/Card'
import Button from '../../styledComponents/CustomButtons/Button'
import CardBody from '../../styledComponents/Card/CardBody'
import GridItem from '../../styledComponents/Grid/GridItem'
//styles
import accordionStyle from '../../static/jss/material-kit-pro-react/components/accordionStyle.jsx'
import styles from '../../static/jss/material-kit-pro-react/views/ecommerceSections/productsStyle.jsx'

const Filters = props => {
  let { classes, filters, setFilters, setSkip } = props

  const firstUpdate = useRef(true)
  const { data } = useQuery(ALL_GENRE_QUERY)
  const [selectedDate, setSelectedDate] = useState(null)

  const handleCategoryFilters = ({ target: { id } }) => {
    filters.categories.indexOf(id) !== -1
      ? setFilters({ ...filters, categories: filters.categories.filter(i => i !== id) })
      : setFilters({ ...filters, categories: [...filters.categories, id] })
  }

  const handleDateFilters = ({ target: { id } }) => {
    filters.dates.indexOf(id) !== -1
      ? setFilters({ ...filters, dates: filters.dates.filter(i => i !== id) })
      : setFilters({ ...filters, dates: [...filters.dates, id] })
  }

  const handleGenreFilters = ({ target: { id } }) => {
    filters.genres.indexOf(id) !== -1
      ? setFilters({ ...filters, genres: filters.genres.filter(i => i !== id) })
      : setFilters({ ...filters, genres: [...filters.genres, id] })
  }
  const handleDateChange = date => {
    setSelectedDate(date)
  }

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }
    if (selectedDate) {
      setFilters({ ...filters, dates: [selectedDate] })
    } else {
      setFilters({ ...filters, dates: [] })
    }
  }, [selectedDate])

  return (
    <Card plain style={{ marginTop: 0 }}>
      <CardBody className={classes.cardBodyRefine}>
        <h4 className={`${classes.cardTitle} ${classes.textLeft}`}>
          Refine
          <Tooltip
            id="tooltip-top"
            title="Reset Filter"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <Button
              link
              justIcon
              size="sm"
              onClick={() => {
                setFilters({ categories: [], genres: [], dates: [] })
              }}
              className={`${classes.pullRight} ${classes.refineButton}`}
            >
              <Cached />
            </Button>
          </Tooltip>
          <Clearfix />
        </h4>
        <Accordion
          active={[0, 1]}
          activeColor="primary"
          collapses={[
            {
              title: 'Category',
              content: (
                <div className={classes.customExpandPanel}>
                  <div
                    className={classes.checkboxAndRadio + ' ' + classes.checkboxAndRadioHorizontal}
                  >
                    <ExpansionPanel
                      root={{
                        boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.1)',
                        backgroundColor: 'transparent'
                      }}
                    >
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMore />}
                        style={{ padding: 0, margin: 0 }}
                        classes={{
                          root: `${classes.expansionPanelSummary} ${
                            classes['primary' + 'ExpansionPanelSummary' + 'border: none']
                          }`,
                          expanded: `${classes.expansionPanelSummaryExpaned} ${
                            classes['primary' + 'ExpansionPanelSummaryExpaned']
                          }`,
                          content: classes.expansionPanelSummaryContent,
                          expandIcon: classes.expansionPanelSummaryExpandIcon
                        }}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              tabIndex={-1}
                              onClick={handleCategoryFilters}
                              checked={
                                filters.categories.indexOf('KZFzniwnSyZfZ7v7nJ') !== -1
                                  ? true
                                  : false
                              }
                              id="KZFzniwnSyZfZ7v7nJ"
                              checkedIcon={<Check className={classes.checkedIcon} />}
                              icon={<Check className={classes.uncheckedIcon} />}
                              classes={{
                                checked: classes.checked,
                                root: classes.checkRoot
                              }}
                            />
                          }
                          classes={{ label: classes.label }}
                          label="Music"
                        />
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails
                        style={{
                          paddingBottom: 0,
                          paddingTop: 0,
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                      >
                        {data.genres
                          ? data.genres
                              .filter(genre => genre.category === 'MUSIC')
                              .map(i => {
                                return (
                                  <FormControlLabel
                                    key={i.id}
                                    control={
                                      <Checkbox
                                        tabIndex={-1}
                                        onClick={handleGenreFilters}
                                        checked={
                                          filters.genres.indexOf(i.tmID) !== -1 ? true : false
                                        }
                                        id={i.tmID}
                                        checkedIcon={<Check className={classes.checkedIcon} />}
                                        icon={<Check className={classes.uncheckedIcon} />}
                                        classes={{
                                          checked: classes.checked,
                                          root: classes.checkRoot
                                        }}
                                      />
                                    }
                                    classes={{
                                      label: classes.label
                                    }}
                                    label={i.name}
                                  />
                                )
                              })
                          : []}
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel style={{ boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.1)' }}>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMore />}
                        style={{ padding: 0, margin: 0 }}
                        classes={{
                          root: `${classes.expansionPanelSummary} ${
                            classes['primary' + 'ExpansionPanelSummary']
                          }`,
                          expanded: `${classes.expansionPanelSummaryExpaned} ${
                            classes['primary' + 'ExpansionPanelSummaryExpaned']
                          }`,
                          content: classes.expansionPanelSummaryContent,
                          expandIcon: classes.expansionPanelSummaryExpandIcon
                        }}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              tabIndex={-1}
                              onClick={handleCategoryFilters}
                              checked={
                                filters.categories.indexOf('KZFzniwnSyZfZ7v7na') !== -1
                                  ? true
                                  : false
                              }
                              id="KZFzniwnSyZfZ7v7na"
                              checkedIcon={<Check className={classes.checkedIcon} />}
                              icon={<Check className={classes.uncheckedIcon} />}
                              classes={{
                                checked: classes.checked,
                                root: classes.checkRoot
                              }}
                            />
                          }
                          classes={{ label: classes.label }}
                          label="Arts & Theatre"
                        />
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails
                        style={{
                          paddingBottom: 0,
                          paddingTop: 0,
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                      >
                        {data.genres
                          ? data.genres
                              .filter(genre => genre.category === 'ARTS_THEATRE')
                              .map(i => (
                                <FormControlLabel
                                  key={i.id}
                                  control={
                                    <Checkbox
                                      tabIndex={-1}
                                      onClick={handleGenreFilters}
                                      checked={filters.genres.indexOf(i.tmID) !== -1 ? true : false}
                                      id={i.tmID}
                                      checkedIcon={<Check className={classes.checkedIcon} />}
                                      icon={<Check className={classes.uncheckedIcon} />}
                                      classes={{
                                        checked: classes.checked,
                                        root: classes.checkRoot
                                      }}
                                    />
                                  }
                                  classes={{ label: classes.label }}
                                  label={i.name}
                                />
                              ))
                          : []}
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel style={{ boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.1)' }}>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMore />}
                        style={{ padding: 0, margin: 0 }}
                        classes={{
                          root: `${classes.expansionPanelSummary} ${
                            classes['primary' + 'ExpansionPanelSummary']
                          }`,
                          expanded: `${classes.expansionPanelSummaryExpaned} ${
                            classes['primary' + 'ExpansionPanelSummaryExpaned']
                          }`,
                          content: classes.expansionPanelSummaryContent,
                          expandIcon: classes.expansionPanelSummaryExpandIcon
                        }}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              tabIndex={-1}
                              onClick={handleCategoryFilters}
                              checked={
                                filters.categories.indexOf('KZFzniwnSyZfZ7v7nE') !== -1
                                  ? true
                                  : false
                              }
                              id="KZFzniwnSyZfZ7v7nE"
                              checkedIcon={<Check className={classes.checkedIcon} />}
                              icon={<Check className={classes.uncheckedIcon} />}
                              classes={{
                                checked: classes.checked,
                                root: classes.checkRoot
                              }}
                            />
                          }
                          classes={{ label: classes.label }}
                          label="Sports"
                        />
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails
                        style={{
                          paddingBottom: 0,
                          paddingTop: 0,
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                      >
                        {data.genres
                          ? data.genres
                              .filter(genre => genre.category === 'SPORTS')
                              .map(i => (
                                <FormControlLabel
                                  key={i.id}
                                  control={
                                    <Checkbox
                                      tabIndex={-1}
                                      onClick={handleGenreFilters}
                                      checked={filters.genres.indexOf(i.tmID) !== -1 ? true : false}
                                      id={i.tmID}
                                      checkedIcon={<Check className={classes.checkedIcon} />}
                                      icon={<Check className={classes.uncheckedIcon} />}
                                      classes={{
                                        checked: classes.checked,
                                        root: classes.checkRoot
                                      }}
                                    />
                                  }
                                  classes={{ label: classes.label }}
                                  label={i.name}
                                />
                              ))
                          : []}
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </div>
                </div>
              )
            },
            {
              title: 'Date',
              content: (
                <div className={classes.customExpandPanel}>
                  <div
                    style={{ marginTop: 0 }}
                    className={classes.checkboxAndRadio + ' ' + classes.checkboxAndRadioHorizontal}
                  >
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <DatePicker
                        margin="none"
                        clearable
                        autoOk
                        disablePast
                        label="Select a date"
                        value={selectedDate}
                        onChange={handleDateChange}
                      />
                    </MuiPickersUtilsProvider>

                    <p style={{ marginTop: '5px' }}>or</p>

                    <FormControlLabel
                      control={
                        <Checkbox
                          tabIndex={-1}
                          onClick={handleDateFilters}
                          checked={filters.dates.indexOf('this week') !== -1 ? true : false}
                          id="this week"
                          checkedIcon={<Check className={classes.checkedIcon} />}
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{
                            checked: classes.checked,
                            root: classes.checkRoot
                          }}
                        />
                      }
                      classes={{ label: classes.label }}
                      label="This week"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          tabIndex={-1}
                          onClick={handleDateFilters}
                          checked={filters.dates.indexOf('this weekend') !== -1 ? true : false}
                          id="this weekend"
                          checkedIcon={<Check className={classes.checkedIcon} />}
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{
                            checked: classes.checked,
                            root: classes.checkRoot
                          }}
                        />
                      }
                      classes={{ label: classes.label }}
                      label="This weekend"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          tabIndex={-1}
                          onClick={handleDateFilters}
                          checked={filters.dates.indexOf('next week') !== -1 ? true : false}
                          id="next week"
                          checkedIcon={<Check className={classes.checkedIcon} />}
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{
                            checked: classes.checked,
                            root: classes.checkRoot
                          }}
                        />
                      }
                      classes={{ label: classes.label }}
                      label="Next week"
                    />
                  </div>
                </div>
              )
            }
          ]}
        />
      </CardBody>
    </Card>
  )
}

export default withStyles({ ...styles, ...accordionStyle })(Filters)
