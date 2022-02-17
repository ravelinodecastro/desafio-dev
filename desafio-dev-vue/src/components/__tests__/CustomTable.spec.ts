import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CustomTable from '../CustomTable.vue'

describe('CustomTable', () => {
  it('renders properly', () => {
    const wrapper = mount(CustomTable, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
