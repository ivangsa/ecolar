import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import EcoDocs from '@/components/admin/docs/docs.vue';
import EcoDocsClass from '@/components/admin/docs/docs.component';

import * as config from '@/shared/config';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);

describe('EcoDocs', () => {
  let ecoDocs: EcoDocsClass;
  let wrapper: Wrapper<EcoDocsClass>;

  beforeEach(() => {
    wrapper = shallowMount<EcoDocsClass>(EcoDocs, {
      i18n,
      localVue
    });
    ecoDocs = wrapper.vm;
  });

  it('should be a Vue instance', async () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
