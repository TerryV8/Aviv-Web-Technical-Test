import { functionHandler } from "@/libs/function";
import { Price } from "@/types.generated";
import { getRepository } from "@/repositories/listings";

export const getListingPrices = functionHandler<Price[]>(async (event, context) => {
    // Assume listingId is passed as a path parameter.
    const listingId = parseInt(event.pathParameters.id);

    // Validate the listingId.
    if (isNaN(listingId)) {
      return { statusCode: 400, response: { message: 'Invalid listing ID' } };
    }

    // Get the prices from the repository.
    const prices = await getRepository(context.postgres).getListingPrices(listingId);

    // Return the prices.
    return { statusCode: 200, response: prices };
  }   
)

//   return {
//     statusCode: 200,
//     response: [
//       { price_eur: 100000, created_date: "2023-01-12T09:23:36Z" },
//       { price_eur: 150000, created_date: "2023-01-17T08:17:32Z" },
//     ],
//   };
// });
