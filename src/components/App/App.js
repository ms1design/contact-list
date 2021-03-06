import React, { useState, useCallback } from "react";
import classnames from "classnames";
import { apiData, useApi } from "../../utils";
import { PersonInfo } from "../PersonInfo";
import "./App.scss";

function App() {
  const [expandedHeader, setExpandedHeader] = useState(false);
  const [selected, setSelected] = useState([]);
  const { fetchedData, isLoading, isAtEnd, error, fetchMore } = useApi({
    apiCallFn: apiData,
  });

  const contactsToggleHandler = useCallback(
    personInfo => () => {
      setSelected(prevSelected =>
        prevSelected.includes(personInfo.id)
          ? prevSelected.filter(id => id !== personInfo.id)
          : [...prevSelected, personInfo.id],
      );
    },
    [],
  );

  const contactsDeselectHandler = useCallback(
    id => () =>
      setSelected(prevSelectedIds =>
        prevSelectedIds.filter(prevId => prevId !== id),
      ),
    [],
  );

  const hasSelectedContacts = selected.length > 0;

  return (
    <div className="App">
      <header
        className={classnames({
          expanded: expandedHeader && hasSelectedContacts,
        })}
      >
        <span className="selected-counter">
          Selected contacts: {selected.length}
        </span>
        {hasSelectedContacts && (
          <>
            <button
              type="button"
              className="selected-trigger"
              onClick={() => setExpandedHeader(prevValue => !prevValue)}
            >
              ›
            </button>
            <div className="selected-contacts">
              {selected.map(id => (
                <PersonInfo
                  key={id}
                  data={fetchedData.find(item => item.id === id)}
                  onClick={contactsDeselectHandler(id)}
                  className="in-store"
                />
              ))}
            </div>
          </>
        )}
      </header>
      <section className="list">
        {fetchedData.map(personInfo => (
          <PersonInfo
            key={personInfo.id}
            data={personInfo}
            className={classnames({
              'is-selected': selected.includes(personInfo.id),
            })}
            onClick={contactsToggleHandler(personInfo)}
          />
        ))}
      </section>
      <div className="loader-wrapper">
        {error && !isLoading && (
          <div className="error-message">{error.message}</div>
        )}
        {!isLoading && !isAtEnd && (
          <button type="button" onClick={fetchMore} className="load-more-btn">
            {error ? 'Try again' : 'Load more'}
          </button>
        )}
        {isLoading && <div className="loader" />}
      </div>
    </div>
  );
}

export default App;
