const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  loading: state => state.loading.loading,
  projectA: state => state.projectA.project
}
export default getters
