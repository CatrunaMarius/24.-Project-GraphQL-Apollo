import { gql } from 'apollo-boost';

import { 
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    getCartTotal,
    getCartItemCount
 } from './cart.utils'










export const typeDefs = gql `
    extend type Item {
        quantity: Int
    }

    extend type DateTime {
        nanoseconds: Int!
        seconds: Int!
    }

    extend type User {
        id: ID!
        displayName: String!
        email: String!
        createdAt: DateTime!
    }

    extend type Mutation {
        ToggleCartHidden: Boolean!
        AddItemToCart(item: Item!): [Item]!
        SetCurrentUser(user: User!): User!
        RemoveItemFromCart(item: Item!): [Item]!
        ClearItemFromCart(item: Item!): [Item]!
    }
`

// query
const GET_CART_HIDDEN = gql `
    {
        cartHidden @client
    }
`

const GET_ITEM_COUNT = gql `
    {
        itemCount @client
    }
`;

const GET_CART_TOTAL = gql `
    {
        cartTotal @client
    }
`;

const GET_CART_ITEMS = gql `
    {
        cartItems @client
    }
`;

const GET_CURRENT_USER = gql `
    {
        currentUser @client
    }
`;

const updateCartItemsRelatedQueries = (cache, newCartItems) => {
    cache.writeQuery({
        query: GET_ITEM_COUNT,
        data: { itemCount: getCartItemCount(newCartItems) }
    });

    cache.writeQuery({
        query: GET_CART_TOTAL,
        data: { cartTotal: getCartTotal(newCartItems) }
    });

    cache.writeQuery({
        query: GET_CART_ITEMS,
        data: { cartItems: newCartItems }
    });
};

// vom defini ce este query/mutatile sau ce alte typuri vom mai avea in partea de client
export const resolvers = {
    Mutation: {
        toggleCartHidden: (_root, _args, { cache }) => {
            // citeste cache
            const { cartHidden } = cache.readQuery({
                query: GET_CART_HIDDEN,
            });

            // update cache odata ce am optinut cache
            cache.writeQuery({
                // optinem aceasi locatie din baza de date
                query: GET_CART_HIDDEN,
                // updata cu data cartHidden
                data: { cartHidden: !cartHidden }
            });

            return !cartHidden;

        },
        
        addItemToCart: (_root, { item }, { cache }) => {
            // citeste cache
            const { cartItems } = cache.readQuery({
                query: GET_CART_ITEMS
            });

            // ne va da un array 
            const newCartItems = addItemToCart(cartItems, item);

            // Numara itemele din cos
            updateCartItemsRelatedQueries(cache, newCartItems);

            return newCartItems;
        },
            
        removeItemFromCart: (_root, { item }, { cache }) => {
            const { cartItems } = cache.readQuery({
                query: GET_CART_ITEMS
            });

            const newCartItems = removeItemFromCart(cartItems, item);

            updateCartItemsRelatedQueries(cache, newCartItems);

            return newCartItems;
        },

        clearItemFromCart: (_root, { item }, { cache }) => {
            const { cartItems } = cache.readQuery({
                query: GET_CART_ITEMS
            });

            const newCartItems = clearItemFromCart(cartItems, item);
            
            updateCartItemsRelatedQueries(cache, newCartItems);

            return newCartItems;
        },

        setCurrentUser: (_root, { user }, { cache }) => {
            cache.writeQuery({
                query: GET_CURRENT_USER,
                data: { currentUser: user }
            });

            return user;
        }                 
    }
};