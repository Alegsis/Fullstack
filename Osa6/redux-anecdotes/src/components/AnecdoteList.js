import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const compare = (anecdoteX, anecdoteY) => {
        if (anecdoteX.votes > anecdoteY.votes) {
            return -1
        }
        if (anecdoteX.votes < anecdoteY.votes) {
            return 1
        }
    }

    const vote = (id) => {
        dispatch(voteAnecdote(id))
    }

    return (
        <div>
            {[...anecdotes].sort(compare).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )

}

export default AnecdoteList
