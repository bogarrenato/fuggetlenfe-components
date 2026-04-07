import{n as e}from"./chunk-BneVvdWh.js";function t(e){return`
    <div
      data-brand="${s(e.brand)}"
      data-theme="${s(e.theme)}"
      style="display:grid;gap:1rem;max-width:${e.fullWidth?`100%`:`420px`};min-height:100vh;padding:2rem;background:var(--ff-color-canvas);color:var(--ff-color-text-primary);font-family:Inter,Arial,sans-serif"
    >
      ${n(e)}
      <div style="display:grid;gap:0.5rem;padding:1rem;border:1px solid var(--ff-color-border-subtle);background:var(--ff-color-surface)">
        <p style="margin:0;text-transform:uppercase;letter-spacing:0.12em;font-size:0.72rem;color:var(--ff-color-text-muted)">
          Launch status
        </p>
        <strong data-launch-message>
          ${s(`Ready to launch ${a(e.brand)} in ${o(e.theme)} mode.`)}
        </strong>
        <span data-launch-count style="color:var(--ff-color-text-secondary)">
          Launches in this session: 0
        </span>
      </div>
    </div>
  `}function n(e){let t=[`type="${s(e.type)}"`];return e.className&&t.push(`class="${s(e.className)}"`),e.fullWidth&&t.push(`full-width`),e.disabled&&t.push(`disabled`),`<ff-button ${t.join(` `)}>${s(e.label)}</ff-button>`}function r(e){return e===`hover`?`demo-state--hover`:e===`active`?`demo-state--active`:``}function i(e,t,n){let r=e.querySelector(`ff-button`),i=e.querySelector(`[data-launch-message]`),s=e.querySelector(`[data-launch-count]`);if(!r||!i||!s||r.dataset.launchBound===`true`)return;let c=0;r.addEventListener(`click`,()=>{c+=1,i.textContent=`${a(t)} launched in ${o(n)} mode at ${new Date().toLocaleTimeString()}.`,s.textContent=`Launches in this session: ${c}`}),r.dataset.launchBound=`true`}function a(e){return e.replace(`brand-`,`Brand `)}function o(e){return e.replaceAll(`-`,` `).replace(/\b\w/g,e=>e.toUpperCase())}function s(e){return e.replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#39;`)}var c,l,u,d,f,p,m,h;e((()=>{c=[`brand-1`,`brand-2`,`brand-3`],l=[`default`,`hover`,`active`,`disabled`],u=`
  ff-button.demo-state--hover::part(button) {
    background: var(--ff-button-bg-hover, var(--ff-button-bg-default, transparent));
    color: var(--ff-button-fg-hover, var(--ff-button-fg-default, inherit));
  }

  ff-button.demo-state--active::part(button) {
    background: var(--ff-button-bg-active, var(--ff-button-bg-default, transparent));
    color: var(--ff-button-fg-active, var(--ff-button-fg-default, inherit));
    transform: translateY(1px);
  }
`,d={title:`Stencil/FfButton`,component:`ff-button`,tags:[`autodocs`],args:{label:`Launch selected brand`,disabled:!1,fullWidth:!1,type:`button`},argTypes:{label:{control:`text`},disabled:{control:`boolean`},fullWidth:{control:`boolean`},type:{control:`inline-radio`,options:[`button`,`submit`,`reset`]}},parameters:{docs:{description:{component:`Stencil implementation of the logic-only button primitive. Brand and theme are now driven exclusively by the outer container and the imported CSS pack.`}}},render:(e,n)=>t({...e,brand:String(n.globals.brand??`brand-1`),theme:String(n.globals.theme??`light`)})},f={play:({canvasElement:e,globals:t})=>{i(e,String(t.brand??`brand-1`),String(t.theme??`light`))}},p={parameters:{controls:{disable:!0},docs:{description:{story:`State previews now come from Storybook-only classes and external CSS tokens, not from component props.`}}},render:(e,t)=>`
      <div
        data-theme="${s(String(t.globals.theme??`light`))}"
        style="min-height:100vh;padding:2rem;background:var(--ff-color-canvas);color:var(--ff-color-text-primary);font-family:Inter,Arial,sans-serif"
      >
        <style>${u}</style>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem;max-width:1200px">
          ${c.map(e=>`
                <section data-brand="${s(e)}" style="border:1px solid var(--ff-color-border-subtle);background:var(--ff-color-surface);padding:1rem">
                  <h3 style="margin:0 0 1rem;font-size:1rem">${s(a(e))}</h3>
                  ${l.map(t=>`
                        <div style="display:grid;grid-template-columns:5rem minmax(0,1fr);align-items:center;gap:0.75rem;margin-bottom:0.75rem">
                          <span style="font-size:0.8rem;color:var(--ff-color-text-secondary)">
                            ${s(t[0].toUpperCase()+t.slice(1))}
                          </span>
                          ${n({label:a(e),disabled:t===`disabled`,fullWidth:!0,type:`button`,className:r(t)})}
                        </div>
                      `).join(``)}
                </section>
              `).join(``)}
        </div>
      </div>
    `},m={parameters:{controls:{disable:!0},docs:{description:{story:`All button API variations rendered in a single view for visual comparison.`}}},render:(e,t)=>{let n=String(t.globals.brand??`brand-1`),r=String(t.globals.theme??`light`);return`
      <div
        data-brand="${s(n)}"
        data-theme="${s(r)}"
        style="min-height:100vh;padding:2rem;background:var(--ff-color-canvas);color:var(--ff-color-text-primary);font-family:Inter,Arial,sans-serif"
      >
        <div style="display:grid;gap:1.5rem;max-width:480px">
          <section>
            <h4 style="margin:0 0 0.5rem;font-size:0.85rem;color:var(--ff-color-text-secondary)">Default</h4>
            <ff-button type="button">Default button</ff-button>
          </section>

          <section>
            <h4 style="margin:0 0 0.5rem;font-size:0.85rem;color:var(--ff-color-text-secondary)">Disabled</h4>
            <ff-button type="button" disabled>Disabled button</ff-button>
          </section>

          <section>
            <h4 style="margin:0 0 0.5rem;font-size:0.85rem;color:var(--ff-color-text-secondary)">Full-width</h4>
            <ff-button type="button" full-width>Full-width button</ff-button>
          </section>

          <section>
            <h4 style="margin:0 0 0.5rem;font-size:0.85rem;color:var(--ff-color-text-secondary)">Submit type</h4>
            <ff-button type="submit">Submit button</ff-button>
          </section>

          <section>
            <h4 style="margin:0 0 0.5rem;font-size:0.85rem;color:var(--ff-color-text-secondary)">Reset type</h4>
            <ff-button type="reset">Reset button</ff-button>
          </section>

          <section>
            <h4 style="margin:0 0 0.5rem;font-size:0.85rem;color:var(--ff-color-text-secondary)">Pill style (custom radius)</h4>
            <ff-button type="button" style="--ff-button-radius:999px">Pill button</ff-button>
          </section>

          <section>
            <h4 style="margin:0 0 0.5rem;font-size:0.85rem;color:var(--ff-color-text-secondary)">Custom token override</h4>
            <ff-button type="button" style="--ff-button-bg-default:#6366f1;--ff-button-fg-default:#fff">Custom tokens</ff-button>
          </section>

          <section>
            <h4 style="margin:0 0 0.5rem;font-size:0.85rem;color:var(--ff-color-text-secondary)">Label prop only (no slotted content)</h4>
            <ff-button type="button" label="Label prop button"></ff-button>
          </section>
        </div>
      </div>
    `}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  play: ({
    canvasElement,
    globals
  }) => {
    setupLaunchPlayground(canvasElement, String(globals.brand ?? 'brand-1'), String(globals.theme ?? 'light'));
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    },
    docs: {
      description: {
        story: 'State previews now come from Storybook-only classes and external CSS tokens, not from component props.'
      }
    }
  },
  render: (_, storyContext) => {
    const activeTheme = String(storyContext.globals.theme ?? 'light');
    return \`
      <div
        data-theme="\${escapeHtml(activeTheme)}"
        style="min-height:100vh;padding:2rem;background:var(--ff-color-canvas);color:var(--ff-color-text-primary);font-family:Inter,Arial,sans-serif"
      >
        <style>\${statePreviewStyles}</style>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem;max-width:1200px">
          \${brandOptions.map(brand => {
      return \`
                <section data-brand="\${escapeHtml(brand)}" style="border:1px solid var(--ff-color-border-subtle);background:var(--ff-color-surface);padding:1rem">
                  <h3 style="margin:0 0 1rem;font-size:1rem">\${escapeHtml(brandLabel(brand))}</h3>
                  \${stateOptions.map(state => {
        return \`
                        <div style="display:grid;grid-template-columns:5rem minmax(0,1fr);align-items:center;gap:0.75rem;margin-bottom:0.75rem">
                          <span style="font-size:0.8rem;color:var(--ff-color-text-secondary)">
                            \${escapeHtml(state[0].toUpperCase() + state.slice(1))}
                          </span>
                          \${createButtonMarkup({
          label: brandLabel(brand),
          disabled: state === 'disabled',
          fullWidth: true,
          type: 'button',
          className: stateClassFor(state)
        })}
                        </div>
                      \`;
      }).join('')}
                </section>
              \`;
    }).join('')}
        </div>
      </div>
    \`;
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    },
    docs: {
      description: {
        story: 'All button API variations rendered in a single view for visual comparison.'
      }
    }
  },
  render: (_, storyContext) => {
    const brand = String(storyContext.globals.brand ?? 'brand-1');
    const theme = String(storyContext.globals.theme ?? 'light');
    return \`
      <div
        data-brand="\${escapeHtml(brand)}"
        data-theme="\${escapeHtml(theme)}"
        style="min-height:100vh;padding:2rem;background:var(--ff-color-canvas);color:var(--ff-color-text-primary);font-family:Inter,Arial,sans-serif"
      >
        <div style="display:grid;gap:1.5rem;max-width:480px">
          <section>
            <h4 style="margin:0 0 0.5rem;font-size:0.85rem;color:var(--ff-color-text-secondary)">Default</h4>
            <ff-button type="button">Default button</ff-button>
          </section>

          <section>
            <h4 style="margin:0 0 0.5rem;font-size:0.85rem;color:var(--ff-color-text-secondary)">Disabled</h4>
            <ff-button type="button" disabled>Disabled button</ff-button>
          </section>

          <section>
            <h4 style="margin:0 0 0.5rem;font-size:0.85rem;color:var(--ff-color-text-secondary)">Full-width</h4>
            <ff-button type="button" full-width>Full-width button</ff-button>
          </section>

          <section>
            <h4 style="margin:0 0 0.5rem;font-size:0.85rem;color:var(--ff-color-text-secondary)">Submit type</h4>
            <ff-button type="submit">Submit button</ff-button>
          </section>

          <section>
            <h4 style="margin:0 0 0.5rem;font-size:0.85rem;color:var(--ff-color-text-secondary)">Reset type</h4>
            <ff-button type="reset">Reset button</ff-button>
          </section>

          <section>
            <h4 style="margin:0 0 0.5rem;font-size:0.85rem;color:var(--ff-color-text-secondary)">Pill style (custom radius)</h4>
            <ff-button type="button" style="--ff-button-radius:999px">Pill button</ff-button>
          </section>

          <section>
            <h4 style="margin:0 0 0.5rem;font-size:0.85rem;color:var(--ff-color-text-secondary)">Custom token override</h4>
            <ff-button type="button" style="--ff-button-bg-default:#6366f1;--ff-button-fg-default:#fff">Custom tokens</ff-button>
          </section>

          <section>
            <h4 style="margin:0 0 0.5rem;font-size:0.85rem;color:var(--ff-color-text-secondary)">Label prop only (no slotted content)</h4>
            <ff-button type="button" label="Label prop button"></ff-button>
          </section>
        </div>
      </div>
    \`;
  }
}`,...m.parameters?.docs?.source}}},h=[`Playground`,`StateMatrix`,`Variants`]}))();export{f as Playground,p as StateMatrix,m as Variants,h as __namedExportsOrder,d as default};