import React, { ReactElement } from 'react';
import Loader from '../../../components/Loader';
import { IResult } from '../../../helpers/apptypes';

type InputWalletLoadingProps = {
  result: string | IResult | null;
  pendingSubmissions: Array<number | Error>;
  createRoomCalled: boolean;
  pendingRequest: boolean;
};

export default function WalletLoading({
  result,
  pendingSubmissions,
  createRoomCalled,
  pendingRequest,
}: InputWalletLoadingProps): ReactElement {
  return (
    <>
      {(result === 'rejected' && (
        <div>
          <h2>Call Request Rejected</h2>
        </div>
      )) ||
        (result &&
          ((pendingSubmissions && (
            <>
              {pendingSubmissions.map((submissionInfo, index) => {
                // const prefix = `Txn Group ${index}: `;
                let content: string;

                if (submissionInfo === 0) {
                  content = 'Submitting...';
                } else if (typeof submissionInfo === 'number') {
                  // content = `Confirmed at round ${submissionInfo}`;
                  content =
                    'Your room has created! Wait for someone to play. You can view your openned rooms on menu (click wallet address) > rooms created.';
                } else {
                  content = 'Rejected by network.';
                }

                // return prefix + content;
                return content;
              })}
            </>
          )) ||
            'Your room has created! Wait for someone to play. You can view your openned rooms on menu > rooms created.')) ||
        (createRoomCalled && !pendingRequest && (
          <div>
            <h2>Connecting to wallet...</h2>
            <Loader />
          </div>
        )) ||
        (pendingRequest && (
          <div>
            <h2>Pending Call Request</h2>
            <Loader />
            <p>Approve or reject request using your wallet</p>
          </div>
        ))}
    </>
  );
}
