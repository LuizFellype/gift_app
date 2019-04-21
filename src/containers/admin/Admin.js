import React, { PureComponent } from 'react'
import { ScrollPanel } from 'primereact/components/scrollpanel/ScrollPanel'
import classNames from 'classnames'
import { Storage } from '../../services'
import { PartnerModal } from '../partnerModal/PartrnerModal'
import Topbar from './Topbar'
import AppMenu from './AppMenu'
import './Admin.css'

export class Admin extends PureComponent {
  constructor() {
    super()
    this.state = {
      layoutMode: 'static',
      layoutColorMode: 'dark',
      staticMenuInactive: false,
      overlayMenuActive: false,
      mobileMenuActive: false,
      partnerModal: false
    }
    this.createMenu()
  }

  onWrapperClick = event => {
    if (!this.menuClick) {
      this.setState({
        overlayMenuActive: false,
        mobileMenuActive: false
      })
    }

    this.menuClick = false
  }

  onToggleMenu = event => {
    this.menuClick = true

    if (this.isDesktop()) {
      if (this.state.layoutMode === 'overlay') {
        this.setState({
          overlayMenuActive: !this.state.overlayMenuActive
        })
      } else if (this.state.layoutMode === 'static') {
        this.setState({
          staticMenuInactive: !this.state.staticMenuInactive
        })
      }
    } else {
      const mobileMenuActive = this.state.mobileMenuActive
      this.setState({
        mobileMenuActive: !mobileMenuActive
      })
    }

    event.preventDefault()
  }

  onSidebarClick = event => {
    this.menuClick = true
    this.layoutMenuScroller.moveBar()
  }

  onMenuItemClick = event => {
    if (!event.item.items) {
      this.setState({
        overlayMenuActive: false,
        mobileMenuActive: false
      })
    }
  }

  onAddFriendModal = () =>
    this.setState({ partnerModal: !this.state.partnerModal })

  createMenu = () => {
    this.menu = [
      {
        icon: 'pi pi-users',
        label: 'Adicionar parceiro(a)',
        command: this.onAddFriendModal
      },
      {
        icon: 'pi pi-sign-out',
        label: 'Sair',
        command: () => {
          Storage.clear()
          this.props.history.push('/login')
        }
      }
    ]
  }

  addClass = (element, className) => {
    if (element.classList) {
      element.classList.add(className)
    } else {
      element.className += ' ' + className
    }
  }

  removeClass = (element, className) => {
    if (element.classList) {
      element.classList.remove(className)
    } else {
      element.className = element.className.replace(
        new RegExp(
          '(^|\\b)' + className.split(' ').join('|') + '(\\b|$)',
          'gi'
        ),
        ' '
      )
    }
  }

  isDesktop = () => {
    return window.innerWidth > 1024
  }

  componentDidUpdate() {
    if (this.state.mobileMenuActive) {
      this.addClass(document.body, 'body-overflow-hidden')
    } else {
      this.removeClass(document.body, 'body-overflow-hidden')
    }
  }

  handleOutsideClicks = e => {
    if (this.state.mobileMenuActive) {
      this.setState({ mobileMenuActive: false })
    }
  }

  render() {
    let wrapperClass = classNames('layout-wrapper', {
      'layout-overlay': this.state.layoutMode === 'overlay',
      'layout-static': this.state.layoutMode === 'static',
      'layout-static-sidebar-inactive':
        this.state.staticMenuInactive && this.state.layoutMode === 'static',
      'layout-overlay-sidebar-active':
        this.state.overlayMenuActive && this.state.layoutMode === 'overlay',
      'layout-mobile-sidebar-active': this.state.mobileMenuActive
    })
    let sidebarClassName = classNames('layout-sidebar', {
      'layout-sidebar-dark': this.state.layoutColorMode === 'dark'
    })

    return (
      <div className={wrapperClass}>
        <Topbar onToggleMenu={this.onToggleMenu} />

        <div
          ref={el => (this.sidebar = el)}
          className={sidebarClassName}
          onClick={this.onSidebarClick}
        >
          <ScrollPanel
            ref={el => (this.layoutMenuScroller = el)}
            style={{ height: '100%' }}
          >
            <div className='layout-sidebar-scroll-content'>
              {sideBarLogo}
              <ul>
                <AppMenu
                  model={this.menu}
                  onMenuItemClick={this.onMenuItemClick}
                />
              </ul>
            </div>
          </ScrollPanel>
        </div>

        <div className='layout-main' onClick={this.handleOutsideClicks}>
          {this.props.children}
        </div>

        <PartnerModal
          visible={this.state.partnerModal}
          onModal={this.onAddFriendModal}
        />
      </div>
    )
  }
}

const sideBarLogo = (
  <div className='sidebar-logo'>
    <h1>GIFT-ME</h1>
  </div>
)
