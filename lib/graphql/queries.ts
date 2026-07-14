import { gql } from 'graphql-tag';

export const PAGE_FRAGMENT = gql`
  fragment PageFragment on PageType {
    isActive
    slugEn
    slugFr
    titleEn
    titleFr
    contentEn
    contentFr
    createdAt
    updatedAt
  }
`;
export const GET_PAGE = gql`
  ${PAGE_FRAGMENT}
  query GetPage($slug: String!) {
    page(slug: $slug) {
      ...PageFragment
    }
  }
`;

export const GET_PARTNERS = gql`
  query GetPartners {
    partners {
      id
      name
      image {
        url
      }
      link
    }
  }
`;

export const GET_SPONSORS = gql`
  query GetSponsors {
    sponsors {
      id
      name
      image {
        url
      }
      link
    }
  }
`;