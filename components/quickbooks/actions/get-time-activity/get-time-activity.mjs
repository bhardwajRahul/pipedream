import { ConfigurationError } from "@pipedream/platform";
import quickbooks from "../../quickbooks.app.mjs";

export default {
  key: "quickbooks-get-time-activity",
  name: "Get Time Activity",
  description: "Returns info about an activity. [See the documentation](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/timeactivity#read-a-timeactivity-object)",
  version: "0.1.10",
  type: "action",
  props: {
    quickbooks,
    timeActivityId: {
      propDefinition: [
        quickbooks,
        "timeActivityId",
      ],
    },
  },
  async run({ $ }) {
    if (!this.timeActivityId) {
      throw new ConfigurationError("Must provide timeActivityId parameter.");
    }

    const response = await this.quickbooks.getTimeActivity({
      $,
      timeActivityId: this.timeActivityId,
      params: {},
    });

    if (response) {
      $.export("summary", `Successfully retrieved time activity with ID ${response.TimeActivity.Id}`);
    }

    return response;
  },
};
