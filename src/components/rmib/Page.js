/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { updateTemplateAction } from "../../actions/rmibActions";
import { Typography, Paper, Grid } from "@material-ui/core";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const useStyles = makeStyles((theme) => ({
  table: {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(1),
    textAlign: "center",
  },
  index: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    textAlign: "center",
    fontWeight: 500,
  },
  item: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    textAlign: "center",
    boxShadow:
      "1px 3px 3px -2px #A2DDFB, 1px 1px 1px -1px #A2DDFB, 1px 1px 3px -3px #A2DDFB",
  },
  errorText: {
    color: "#F75291",
    fontWeight: "bold",
  },
}));

const RMIBPage = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const template = useSelector((state) => state.rmib.template);
  const user = JSON.parse(localStorage.getItem("user"));
  // const hasError = useSelector((state) => state.rmib.hasError);
  const [currentData, setCurrentData] = React.useState([]);
  const { page } = props;
  let limit = page * 12;
  if (limit > template.doc.length) {
    limit = template.doc.length;
  }

  useEffect(() => {
    let data = template.doc.slice((page - 1) * 12, limit);
    if (typeof data[0].rank !== "undefined") {
      data.sort((a, b) => {
        return parseInt(a.rank) - parseInt(b.rank);
      });
    } else {
      for (let i = 0; i < limit; i++) {
        template.doc[i].rank = i + 1;
      }
    }

    for (let i in data) {
      data[i].id = i;
    }
    setCurrentData(data);
  }, [page]);

  let index = [];
  for (let i = 1; i < 13; i++) {
    index.push(<Typography className={classes.index}>{i}</Typography>);
  }

  const reorder = (list, fromIndex, toIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(fromIndex, 1);
    result.splice(toIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const fromIndex = result.source.index;
    const toIndex = result.destination.index;

    if (fromIndex === toIndex) return;
    const newOrder = reorder(currentData, fromIndex, toIndex);

    let rankIndex = {};
    for (let i in newOrder) {
      newOrder[i].rank = parseInt(i) + 1;
      rankIndex[newOrder[i].index] = newOrder[i].rank;
    }

    for (let i = 0; i < limit; i++) {
      template.doc[i].rank = rankIndex[template.doc[i].index];
    }

    dispatch(updateTemplateAction(template));
    setCurrentData(newOrder);
  };

  return (
    <div>
      <Grid container className={classes.table}>
        <Grid item xs={4}>
          {index}
        </Grid>
        <Grid item xs={8}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {currentData
                    ? currentData.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Paper className={classes.item}>
                                <Typography>
                                  {
                                    (user.gender = "M"
                                      ? item.male
                                      : item.female)
                                  }
                                </Typography>
                              </Paper>
                            </div>
                          )}
                        </Draggable>
                      ))
                    : null}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Grid>
      </Grid>
    </div>
  );
};

export default RMIBPage;
