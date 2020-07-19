import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import 'react-toastify/dist/ReactToastify.css'
import { toast, cssTransition } from 'react-toastify'
import './assets/styles.scss'
import PropTypes from 'prop-types'

const rootLoading = document.getElementById('root-loading')

class PortalModal extends React.Component {
  constructor (props) {
    super(props)
    this.element = document.createElement('div')
  }

  componentDidMount () {
    rootLoading.appendChild(this.element)
  }

  componentWillUnmount () {
    rootLoading.removeChild(this.element)
  }

  render () {
    return ReactDOM.createPortal(
      this.props.children,
      this.element
    )
  }
}

PortalModal.propTypes = {
  children: PropTypes.node
}

const Zoom = cssTransition({
  enter: 'zoomIn',
  exit: 'zoomOut',
  duration: [500, 1500]
})

class Loading extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      show: false
    }
    this.showToast = this.showToast.bind(this)
    this.hideToast = this.hideToast.bind(this)

    this.counter = []
    this.timerId = []

    this.loadingNumber = 0
    this.timer = null
  }

  showToast () {
    this.loadingNumber++

    const loading = document.getElementsByClassName('global-loading')
    if (loading.length === 0) {
      this.setState({ show: true })
    }

    // Set setInterval
    if (!this.timer) {
      this.timer = setInterval(() => {
        if (this.loadingNumber <= 0) {
          this.setState({ show: false })
          clearInterval(this.timer)
          this.timer = null
          this.loadingNumber = 0
        }
      }
        , 600)
    }
  }

  hideToast () {
    this.loadingNumber--
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render () {
    const { show } = this.state
    return (
      <Fragment>
        {
          show &&
            <PortalModal >
              <div className='global-loading loading-show' >
                <div className='loading-section' />
              </div>
              <div className='loading-wrapper'>
                <div className='loading-border'>
                  <div className='atom-spinner'>
                    <div className='spinner-inner'>
                      <div className='spinner-line' />
                      <div className='spinner-line' />
                      <div className='spinner-line' />
                      <div className='spinner-circle'>&#9679;</div>
                    </div>
                  </div>
                  <div className='loading-content'>サーバーと通信中です</div>
                </div>
              </div>
            </PortalModal>
        }
      </Fragment>
    )
  }
}

function successModalConfirm () {
  toast.warn(
    <div>
      <div className='toast-loading' />
      <div className='toast-image'><i className='fas fa-minus-circle' /></div>
      <div className='toast-loading-content'>原因不明のエラーが発生しました</div>
    </div>, {
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      transition: Zoom
    }
  )
}

function successModal (message = null) {
  toast.success(
    <Fragment>
      <div className='toast-image'><i className='fa fa-check-circle' /></div>
      <div className='toast-loading-content'>{message || 'success'}</div>
    </Fragment>, {
      positions: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      transition: Zoom
    }
  )
}

function errorModal (message) {
  toast.error(
    <div>
      <div className='toast-image'><i className='fas fa-minus-circle' /></div>
      <div className='toast-loading-content'>{message || '入力（選択）にエラーがあります'}</div>
    </div>, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      transition: Zoom
    }
  )
}

export {
  successModal,
  Loading,
  errorModal,
  successModalConfirm
}
