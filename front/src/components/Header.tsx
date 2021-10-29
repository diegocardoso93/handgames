import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { ellipseAddress, formatBigNumWithDecimals } from '../helpers/utilities';
import { ChainType } from '../helpers/api';
import {
  Menu,
  MenuItem,
  MenuClose,
  SActiveAccount,
  SAddress,
  SDisconnect,
  SHeader,
  MenuTop,
} from './styled';
import { IAssetData } from '../helpers/types';
import { Link } from 'react-router-dom';

interface IHeaderProps {
  killSession: () => unknown;
  connected: boolean;
  address: string;
  chain: ChainType;
  chainUpdate: (newChain: ChainType) => unknown;
  walletConnectInit: () => void;
  assets: IAssetData[];
}

function stringToChainType(s: string): ChainType {
  switch (s) {
    case ChainType.MainNet.toString():
      return ChainType.MainNet;
    case ChainType.TestNet.toString():
      return ChainType.TestNet;
    default:
      throw new Error(`Unknown chain selected: ${s}`);
  }
}

const Header = (props: IHeaderProps) => {
  const { connected, address, killSession, walletConnectInit, assets } = props;
  const algoAsset = assets.find((a) => a.name === 'Algo');

  const balance = formatBigNumWithDecimals(
    algoAsset?.amount || BigInt(0),
    algoAsset?.decimals || 6
  ).slice(0, 4);

  const [dropdown, showDropdown] = useState(false);
  return (
    <SHeader {...props}>
      <Link to="/">
        <img
          src="/img/logo.png"
          style={{ width: 160, marginTop: 8, marginLeft: 10 }}
        />
      </Link>

      {(address && (
        <SActiveAccount>
          <SAddress connected={connected} onClick={() => showDropdown(true)}>
            {ellipseAddress(address)}
          </SAddress>
          <div>
            <select
              onChange={(event) =>
                props.chainUpdate(stringToChainType(event.target.value))
              }
              value={props.chain}
            >
              <option value={ChainType.TestNet}>Algorand TestNet</option>
              <option value={ChainType.MainNet}>Algorand MainNet</option>
            </select>
          </div>
        </SActiveAccount>
      )) || (
        <button type="button" onClick={walletConnectInit}>
          Connect Wallet
        </button>
      )}
      {dropdown && (
        <Menu>
          <MenuTop>
            {balance} Algos
            <MenuClose onClick={() => showDropdown(false)}>&times;</MenuClose>
          </MenuTop>
          <MenuItem>{'rooms created'}</MenuItem>
          <MenuItem>{'wins and losts'}</MenuItem>
          <MenuItem onClick={killSession}>{'disconnect'}</MenuItem>
        </Menu>
      )}
    </SHeader>
  );
};

Header.propTypes = {
  killSession: PropTypes.func.isRequired,
  address: PropTypes.string,
};

export default Header;
