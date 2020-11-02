const actions = {
  setHotSearchOffsetY({ commit }, offsetY) {
    return commit('SET_HOT_SEARCH_OFFSETY', offsetY);
  },
  setFlapCardVisible({ commit }, visible) {
    return commit('SET_FLAP_CARD_VISIBLE', visible);
  },
  setIsEditMode({ commit }, isEditMode) {
    return commit('SET_IS_EDIT_MODE', isEditMode);
  },
  setShelfList({ commit }, list) {
    return commit('SET_SHELF_LIST', list);
  },
  setShelfSelected({ commit }, selected) {
    return commit('SET_SHELF_SELECTED', selected);
  },
  setShelfTitleVisible({ commit }, visible) {
    return commit('SET_SHELF_TITLE_VISIBLE', visible);
  }
};
export default actions;
