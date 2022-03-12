import "@testing-library/jest-dom";
import React from "react";
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import Restaurant from "../features/restaurants/Restaurant";
import { restaurantAdded } from "../features/restaurants/restaurantsSlice";
import store from "../store";
import { reviewAdded } from "../features/reviews/reviewsSlice";

store.dispatch(restaurantAdded("test 1"));
store.dispatch(restaurantAdded("test 2"));

const { entities } = store.getState().restaurants;
const [restaurant1, restaurant2] = entities;

test("takes a prop of restaurant and creates an element displaying the restaurant name", () => {
  render(
    <Provider store={store}>
      <Restaurant restaurant={restaurant1} />
    </Provider>
  );
  expect(screen.queryByText(restaurant1.name)).toBeInTheDocument();
});

test("displays a delete button", () => {
  render(
    <Provider store={store}>
      <Restaurant restaurant={restaurant1} />
    </Provider>
  );
  expect(screen.queryByText(/Delete Restaurant/i)).toBeInTheDocument();
  expect(screen.queryByText(/Delete Restaurant/i).tagName).toBe("BUTTON");
});

test("clicking the delete button removes the restaurant from the redux store", () => {
  render(
    <Provider store={store}>
      <Restaurant restaurant={restaurant2} />
    </Provider>
  );
  fireEvent.click(screen.queryByText(/Delete restaurant/i));

  expect(store.getState().restaurants.entities).toEqual([restaurant1]);
});

test("displays the reviews associated with the restaurant", () => {
  store.dispatch(
    reviewAdded({ comment: "review 1", restaurantId: restaurant1.id })
  );
  store.dispatch(
    reviewAdded({ comment: "review 2", restaurantId: restaurant1.id })
  );
  store.dispatch(
    reviewAdded({ comment: "review 3", restaurantId: restaurant2.id })
  );

  render(
    <Provider store={store}>
      <Restaurant restaurant={restaurant1} />
    </Provider>
  );

  expect(screen.queryByText("review 1")).toBeInTheDocument();
  expect(screen.queryByText("review 2")).toBeInTheDocument();
  expect(screen.queryByText("review 3")).not.toBeInTheDocument();
});
