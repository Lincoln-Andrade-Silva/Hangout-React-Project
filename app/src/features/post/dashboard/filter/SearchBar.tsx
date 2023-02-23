import { observer } from "mobx-react-lite";
import React from "react";
import { Grid, Search } from "semantic-ui-react";
import { useStore } from "../../../../app/stores/store";

export default observer(function SearchBar() {

    const initialState = {
        loading: false,
        results: [],
        value: '',
    }
    const { postStore } = useStore();
    const { postsByDate, setPredicate } = postStore;
    const [state, dispatch] = React.useReducer(reducer, initialState)
    const { loading, results, value } = state

    function reducer(state: any, action: any) {
        switch (action.type) {
            case 'CLEAN_QUERY':
                return initialState
            case 'START_SEARCH':
                return { ...state, loading: true, value: action.query }
            case 'FINISH_SEARCH':
                return { ...state, loading: false, results: action.results }
            case 'UPDATE_SELECTION':
                return { ...state, value: action.selection }

            default:
                throw new Error()
        }
    }

    const handleSearchChange = React.useCallback((e: any, data: any) => {
        dispatch({ type: 'START_SEARCH', query: data.value })

        if (data.value.length === 0) {
            dispatch({ type: 'CLEAN_QUERY' })
            return
        }

        dispatch({
            type: 'FINISH_SEARCH',
            results: postsByDate.filter(obj => obj.title.includes(data.value))
        })
    }, [postsByDate]);

    return (
        <Grid>
            <Grid.Column>
                <Search
                    fluid
                    size="big"
                    
                    loading={loading}
                    placeholder='Search...'
                    onResultSelect={(e, data) => {
                        dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title })
                        setPredicate('Search', data.result.title)
                    }}
                    onSearchChange={handleSearchChange}
                    results={results}
                    value={value}
                />
            </Grid.Column>
        </Grid>
    )
})