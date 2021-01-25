import { useIntl } from '@vtex/gatsby-plugin-i18n'
import { Flex, Header } from '@vtex/store-ui'
import React, { Fragment } from 'react'
import type { FC } from 'react'
import Login from '@vtex/gatsby-theme-store/src/components/Login'
import Logo from '@vtex/gatsby-theme-store/src/components/Logo'
import Menu from '@vtex/gatsby-theme-store/src/components/Menu'
import Minicart from '@vtex/gatsby-theme-store/src/components/Minicart'
import NotificationBar from '@vtex/gatsby-theme-store/src/components/NotificationBar'
import OverMenu from '@vtex/gatsby-theme-store/src/components/OverMenu'
import SearchBar from '@vtex/gatsby-theme-store/src/components/SearchBar'


const StoreHeader: FC = () => {
  const variant = 'header'

  const test = async () => {
    fetch('/functions/hello').then(resp => resp.text().then(text => alert(text)))
  }

  return (
    <Fragment>
      <NotificationBar
        text={<div onClick={test}>Serverless function test</div>}
        variant={`${variant}.notificationbar`}
      />
      <OverMenu variant={`${variant}.overmenu`} />
      <Header variant={variant}>
        <Flex variant={`${variant}.left`}>
          <Logo variant={`${variant}.logo`} />
          <Menu variant={`${variant}.menu`} />
        </Flex>
        <Flex variant={`${variant}.right`}>
          <SearchBar placeholder="Search" aria-label="Search" />
          <Login />
          <Minicart />
        </Flex>
      </Header>
    </Fragment>
  )
}

export default StoreHeader

