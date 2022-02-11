import React from 'react'
import { useSnapshot } from 'valtio'
import { state } from '../services/state'


const ProblemReport = () => {
  const snap = useSnapshot(state)
  const version = snap.version
  const buildDate = snap.versionBuildDate
  const supportEmail = process.env.REACT_APP_SUPPORT_EMAIL

  const messageTemplate = `mailto:${supportEmail}?\
subject=UDTools Issue Report&body=Version: ${version}\
, Build Date: ${buildDate}%0D%0A%0D%0A\
[thanks for reporting an issue with UDTools! please replace \
this text with a detailed description of your issue, \
include screenshots if possible]`

  return (
    <a href={messageTemplate}>Report a Problem</a>
  )
}


export default ProblemReport