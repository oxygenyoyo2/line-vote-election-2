/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-unnecessary-act */
import { ApolloProvider } from "@apollo/client";
import React from "react";
import App, { GET_CANDIDATES } from "./App";
import client from './apollo-client';
import { render, cleanup } from "@testing-library/react";
import { MockedProvider } from '@apollo/client/testing';
import { act } from "react-test-renderer";

const mocks = [
  {
    request: {
      query: GET_CANDIDATES,
    },
    result: {
      "data": {
        "candidates": [
          {
            "id": "7",
            "name": "Leonard",
            "dob": "15th January",
            "bioLink": "https://line.fandom.com/wiki/Leonard",
            "policy": "Singing in the rain",
            "imageURL": "https://static.wikia.nocookie.net/line/images/1/1d/2015-leonard.png/revision/latest",
            "votedCount": 0
          },
          {
            "id": "6",
            "name": "Leonard",
            "dob": "15th January",
            "bioLink": "https://line.fandom.com/wiki/Leonard",
            "policy": "Singing in the rain",
            "imageURL": "https://static.wikia.nocookie.net/line/images/1/1d/2015-leonard.png/revision/latest",
            "votedCount": 0
          },
          {
            "id": "3",
            "name": "Sally",
            "dob": "27th April",
            "bioLink": "https://line.fandom.com/wiki/Sally",
            "policy": "Tag-along with Brown",
            "imageURL": "https://static.wikia.nocookie.net/line/images/a/af/Image-1.jpg/revision/latest",
            "votedCount": 0
          }
        ]
      }
    },
  }
]; // We'll fill this in next


afterEach(cleanup);


it("should show LINE TOWN Election", async () => {
  let { findByText } = render(<ApolloProvider client={client}><App /></ApolloProvider>);
  expect(await findByText('LINE TOWN Election')).toBeVisible()
});


it("should see Skeleton", async () => {
  let { container } = render(<ApolloProvider client={client}><App /></ApolloProvider>);
  expect(container.getElementsByClassName('animate-pulse').length).toBe(10)
});
