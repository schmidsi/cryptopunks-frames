import { request, GraphQLClient, gql } from "graphql-request";
import { formatEther } from "viem";
import { ImageResponse } from "next/og";

export const runtime = "edge";

const GRAPHQL_ENDPOINT = `https://gateway-arbitrum.network.thegraph.com/api/${process.env.THE_GRAPH_API_KEY}/subgraphs/id/2hTKKMwLsdfJm9N7gUeajkgg8sdJwky56Zpkvg8ZcyP8`;

export async function GET() {
  const document = gql`
    {
      sales(orderBy: timestamp, orderDirection: desc, first: 1) {
        amount
        timestamp
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

  const response: any = await graphQLClient.request(document);

  if (response?.sales?.[0]?.nft?.metadata?.svg) {
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
            display: "flex",
          }}
        >
          <img
            src={response.sales[0].nft.metadata.svg}
            height="200"
            width="200"
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex" }}>
              Price: {formatEther(response.sales[0].amount)} ETH
            </div>
            <div style={{ display: "flex" }}>
              Time: {new Date(response.sales[0].timestamp * 1000).toISOString()}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } else {
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
            display: "flex",
          }}
        >
          Error fetching data :(. Please try again later.
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }
}
