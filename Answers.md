1. What problem does the context API help solve?
   The Context API solves the problem of 'prop drilling'. Essentially without a state management setup like redux or context, if you wanted to pass state through to a child component 3 tiers down, you would have to pass it into it's parent components whether they need them or not.

2. In your own words, describe `actions`, `reducers` and the `store` and their role in Redux. What does each piece do? Why is the store known as a 'single source of truth' in a redux application?

- Actions: Source of payload information to send to the store
- Reducers: Specify how the apps state changes in response to actions (redux.js.org)
- Store: Brings everything together, holding state, access/updates to state, subscribe/unsubscribe to listeners etc.

3. What is the difference between Application state and Component state? When would be a good time to use one over the other?

- Application state: State that can be used globally across all components
- Component State: State that is only important in that specific component and does not to be shared with rest of app

4. Describe `redux-thunk`, what does it allow us to do? How does it change our `action-creators`?

- Redux-Thunk allows us to have asynchronous actions/state.
- It changes our action-creators by allowing them to return a dispatch function, which by overtakes the synchronous action and waits for the async activity to complete

5. What is your favorite state management system you've learned and this sprint? Please explain why!

- Redux is my favourite although I do like where the Context API is going. Redux I enjoy more because I still enjoy the idea of one place to store all your state. The organization flow of things makes for cleaner code in my opnion. Context does allow for that but Redux breaks it down even more for me from what I have experienced so far.
