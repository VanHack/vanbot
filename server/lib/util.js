import regex from '../../lib/util/regex';

export const getBotMessage = (text) => {
  const hasLinkedinUrl = regex.linkedin.test(text)
  const hasGoogleUrl = regex.google.test(text)

  if (hasLinkedinUrl && hasGoogleUrl) {
    return 'We will review your Linkedin and CV soon! Keep on hacking!'
  } else if (hasLinkedinUrl) {
    return 'We will review your Linkedin profile soon! Keep on hacking!'
  } else {
    return 'We will review your CV soon! Keep on hacking!'
  }
}
