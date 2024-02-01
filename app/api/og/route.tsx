import { request, GraphQLClient, gql } from "graphql-request";
import { ImageResponse } from "next/og";

export const runtime = "edge";

const GRAPHQL_ENDPOINT = `https://gateway-arbitrum.network.thegraph.com/api/${process.env.THE_GRAPH_API_KEY}/subgraphs/id/2hTKKMwLsdfJm9N7gUeajkgg8sdJwky56Zpkvg8ZcyP8`;

export async function GET() {
  const document = gql`
    {
      sales(orderBy: timestamp, orderDirection: desc, first: 1) {
        amount
        nft {
          tokenId
          ... on Punk {
            id
            metadata {
              contractURI
              id
              tokenId
              tokenURI
              svg
              traits {
                id
                type
              }
            }
          }
        }
      }
    }
  `;

  const graphQLClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
    fetch,
  });
  // const response = await request(``, document);

  const response = await graphQLClient.request(document);

  console.log(response);

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          color: "black",
          background: "white",
          width: "100%",
          height: "100%",
          padding: "50px 200px",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        👋 Hello
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
