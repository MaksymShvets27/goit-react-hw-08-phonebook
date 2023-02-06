export const selectFilteredContact = state => {
  return state.filter.filter
    ? state.contacts.contacts.items.filter(contact =>
        contact.name
          .toLocaleLowerCase()
          .includes(state.filter.filter.toLocaleLowerCase())
      )
    : state.contacts.contacts.items;
};
export const selectIsUserLoggedIn = state => state.auth.isLoggedIn;
export const selectIsUserRefreshing = state => state.auth.isRefreshing;
export const selectUser = state => state.auth.user;
