layui.define(["form", "jquery"],
    function(exports) {
        var jQuery = layui.jquery,
            $ = jQuery,
            form = layui.form,
            _MOD = "treeSelect",
            trss = {},
            TreeSelect = function() {
                this.v = "1.0.4"
            }; !
            function(r) {
                var J, K, L, M, N, O, v, t = {},
                    w = {},
                    x = {},
                    P = {
                        treeId: "",
                        treeObj: null,
                        view: {
                            addDiyDom: null,
                            autoCancelSelected: !0,
                            dblClickExpand: !0,
                            expandSpeed: "fast",
                            fontCss: {},
                            nameIsHTML: !1,
                            selectedMulti: !0,
                            showIcon: !0,
                            showLine: !0,
                            showTitle: !0,
                            txtSelectedEnable: !1
                        },
                        data: {
                            key: {
                                isParent: "isParent",
                                children: "children",
                                name: "name",
                                title: "",
                                url: "url",
                                icon: "icon"
                            },
                            simpleData: {
                                enable: !1,
                                idKey: "id",
                                pIdKey: "pId",
                                rootPId: null
                            },
                            keep: {
                                parent: !1,
                                leaf: !1
                            }
                        },
                        async: {
                            enable: !1,
                            contentType: "application/x-www-form-urlencoded",
                            type: "post",
                            dataType: "text",
                            headers: {},
                            xhrFields: {},
                            url: "",
                            autoParam: [],
                            otherParam: [],
                            dataFilter: null
                        },
                        callback: {
                            beforeAsync: null,
                            beforeClick: null,
                            beforeDblClick: null,
                            beforeRightClick: null,
                            beforeMouseDown: null,
                            beforeMouseUp: null,
                            beforeExpand: null,
                            beforeCollapse: null,
                            beforeRemove: null,
                            onAsyncError: null,
                            onAsyncSuccess: null,
                            onNodeCreated: null,
                            onClick: null,
                            onDblClick: null,
                            onRightClick: null,
                            onMouseDown: null,
                            onMouseUp: null,
                            onExpand: null,
                            onCollapse: null,
                            onRemove: null
                        }
                    },
                    y = [function(i) {
                        var e = i.treeObj,
                            t = g.event;
                        e.bind(t.NODECREATED,
                            function(e, t, n) {
                                h.apply(i.callback.onNodeCreated, [e, t, n])
                            }),
                            e.bind(t.CLICK,
                                function(e, t, n, o, r) {
                                    h.apply(i.callback.onClick, [t, n, o, r])
                                }),
                            e.bind(t.EXPAND,
                                function(e, t, n) {
                                    h.apply(i.callback.onExpand, [e, t, n])
                                }),
                            e.bind(t.COLLAPSE,
                                function(e, t, n) {
                                    h.apply(i.callback.onCollapse, [e, t, n])
                                }),
                            e.bind(t.ASYNC_SUCCESS,
                                function(e, t, n, o) {
                                    h.apply(i.callback.onAsyncSuccess, [e, t, n, o])
                                }),
                            e.bind(t.ASYNC_ERROR,
                                function(e, t, n, o, r, a) {
                                    h.apply(i.callback.onAsyncError, [e, t, n, o, r, a])
                                }),
                            e.bind(t.REMOVE,
                                function(e, t, n) {
                                    h.apply(i.callback.onRemove, [e, t, n])
                                }),
                            e.bind(t.SELECTED,
                                function(e, t, n) {
                                    h.apply(i.callback.onSelected, [t, n])
                                }),
                            e.bind(t.UNSELECTED,
                                function(e, t, n) {
                                    h.apply(i.callback.onUnSelected, [t, n])
                                })
                    }],
                    z = [function(e) {
                        var t = g.event;
                        e.treeObj.unbind(t.NODECREATED).unbind(t.CLICK).unbind(t.EXPAND).unbind(t.COLLAPSE).unbind(t.ASYNC_SUCCESS).unbind(t.ASYNC_ERROR).unbind(t.REMOVE).unbind(t.SELECTED).unbind(t.UNSELECTED)
                    }],
                    A = [function(t) {
                        var n = e.getCache(t);
                        n || (n = {},
                            e.setCache(t, n)),
                            n.nodes = [],
                            n.doms = []
                    }],
                    B = [function(t, n, o, r, a, i) {
                        if (o) {
                            var d = e.getRoot(t),
                                l = e.nodeChildren(t, o);
                            o.level = n,
                                o.tId = t.treeId + "_" + ++d.zId,
                                o.parentTId = r ? r.tId: null,
                                o.open = "string" == typeof o.open ? h.eqs(o.open, "true") : !!o.open,
                                n = e.nodeIsParent(t, o),
                                h.isArray(l) && !(!1 === n || "string" == typeof n && h.eqs(n, "false")) ? (e.nodeIsParent(t, o, !0), o.zAsync = !0) : (n = e.nodeIsParent(t, o, n), o.open = !(!n || t.async.enable) && o.open, o.zAsync = !n),
                                o.isFirstNode = a,
                                o.isLastNode = i,
                                o.getParentNode = function() {
                                    return e.getNodeCache(t, o.parentTId)
                                },
                                o.getPreNode = function() {
                                    return e.getPreNode(t, o)
                                },
                                o.getNextNode = function() {
                                    return e.getNextNode(t, o)
                                },
                                o.getIndex = function() {
                                    return e.getNodeIndex(t, o)
                                },
                                o.getPath = function() {
                                    return e.getNodePath(t, o)
                                },
                                o.isAjaxing = !1,
                                e.fixPIdKeyValue(t, o)
                        }
                    }],
                    u = [function(t) {
                        var n = t.target,
                            o = e.getSetting(t.data.treeId),
                            r = "",
                            a = null,
                            i = "",
                            d = "",
                            l = null,
                            s = null,
                            c = null;
                        if (h.eqs(t.type, "mousedown") ? d = "mousedown": h.eqs(t.type, "mouseup") ? d = "mouseup": h.eqs(t.type, "contextmenu") ? d = "contextmenu": h.eqs(t.type, "click") ? h.eqs(n.tagName, "span") && null !== n.getAttribute("treeNode" + g.id.SWITCH) ? (r = h.getNodeMainDom(n).id, i = "switchNode") : (c = h.getMDom(o, n, [{
                            tagName: "a",
                            attrName: "treeNode" + g.id.A
                        }])) && (r = h.getNodeMainDom(c).id, i = "clickNode") : h.eqs(t.type, "dblclick") && (d = "dblclick", c = h.getMDom(o, n, [{
                            tagName: "a",
                            attrName: "treeNode" + g.id.A
                        }])) && (r = h.getNodeMainDom(c).id, i = "switchNode"), 0 < d.length && 0 == r.length && (c = h.getMDom(o, n, [{
                            tagName: "a",
                            attrName: "treeNode" + g.id.A
                        }])) && (r = h.getNodeMainDom(c).id), 0 < r.length) switch (a = e.getNodeCache(o, r), i) {
                            case "switchNode":
                                e.nodeIsParent(o, a) && (h.eqs(t.type, "click") || h.eqs(t.type, "dblclick") && h.apply(o.view.dblClickExpand, [o.treeId, a], o.view.dblClickExpand)) ? l = J: i = "";
                                break;
                            case "clickNode":
                                l = K
                        }
                        switch (d) {
                            case "mousedown":
                                s = L;
                                break;
                            case "mouseup":
                                s = M;
                                break;
                            case "dblclick":
                                s = N;
                                break;
                            case "contextmenu":
                                s = O
                        }
                        return {
                            stop: !1,
                            node: a,
                            nodeEventType: i,
                            nodeEventCallback: l,
                            treeEventType: d,
                            treeEventCallback: s
                        }
                    }],
                    C = [function(t) {
                        var n = e.getRoot(t);
                        n || (n = {},
                            e.setRoot(t, n)),
                            e.nodeChildren(t, n, []),
                            n.expandTriggerFlag = !1,
                            n.curSelectedList = [],
                            n.noSelection = !0,
                            n.createdNodes = [],
                            n.zId = 0,
                            n._ver = (new Date).getTime()
                    }],
                    D = [],
                    E = [],
                    F = [],
                    G = [],
                    H = [],
                    e = {
                        addNodeCache: function(t, n) {
                            e.getCache(t).nodes[e.getNodeCacheId(n.tId)] = n
                        },
                        getNodeCacheId: function(e) {
                            return e.substring(e.lastIndexOf("_") + 1)
                        },
                        addAfterA: function(e) {
                            E.push(e)
                        },
                        addBeforeA: function(e) {
                            D.push(e)
                        },
                        addInnerAfterA: function(e) {
                            G.push(e)
                        },
                        addInnerBeforeA: function(e) {
                            F.push(e)
                        },
                        addInitBind: function(e) {
                            y.push(e)
                        },
                        addInitUnBind: function(e) {
                            z.push(e)
                        },
                        addInitCache: function(e) {
                            A.push(e)
                        },
                        addInitNode: function(e) {
                            B.push(e)
                        },
                        addInitProxy: function(e, t) {
                            t ? u.splice(0, 0, e) : u.push(e)
                        },
                        addInitRoot: function(e) {
                            C.push(e)
                        },
                        addNodesData: function(t, n, o, r) {
                            var a = e.nodeChildren(t, n);
                            a ? o >= a.length && (o = -1) : (a = e.nodeChildren(t, n, []), o = -1),
                                0 < a.length && 0 === o ? (a[0].isFirstNode = !1, j.setNodeLineIcos(t, a[0])) : 0 < a.length && o < 0 && (a[a.length - 1].isLastNode = !1, j.setNodeLineIcos(t, a[a.length - 1])),
                                e.nodeIsParent(t, n, !0),
                                o < 0 ? e.nodeChildren(t, n, a.concat(r)) : (t = [o, 0].concat(r), a.splice.apply(a, t))
                        },
                        addSelectedNode: function(t, n) {
                            var o = e.getRoot(t);
                            e.isSelectedNode(t, n) || o.curSelectedList.push(n)
                        },
                        addCreatedNode: function(t, n) { (t.callback.onNodeCreated || t.view.addDiyDom) && e.getRoot(t).createdNodes.push(n)
                        },
                        addZTreeTools: function(e) {
                            H.push(e)
                        },
                        exSetting: function(e) {
                            r.extend(!0, P, e)
                        },
                        fixPIdKeyValue: function(e, t) {
                            e.data.simpleData.enable && (t[e.data.simpleData.pIdKey] = t.parentTId ? t.getParentNode()[e.data.simpleData.idKey] : e.data.simpleData.rootPId)
                        },
                        getAfterA: function(e, t, n) {
                            for (var o = 0,
                                     r = E.length; o < r; o++) E[o].apply(this, arguments)
                        },
                        getBeforeA: function(e, t, n) {
                            for (var o = 0,
                                     r = D.length; o < r; o++) D[o].apply(this, arguments)
                        },
                        getInnerAfterA: function(e, t, n) {
                            for (var o = 0,
                                     r = G.length; o < r; o++) G[o].apply(this, arguments)
                        },
                        getInnerBeforeA: function(e, t, n) {
                            for (var o = 0,
                                     r = F.length; o < r; o++) F[o].apply(this, arguments)
                        },
                        getCache: function(e) {
                            return x[e.treeId]
                        },
                        getNodeIndex: function(t, n) {
                            if (!n) return null;
                            for (var o = n.parentTId ? n.getParentNode() : e.getRoot(t), r = 0, a = (o = e.nodeChildren(t, o)).length - 1; r <= a; r++) if (o[r] === n) return r;
                            return - 1
                        },
                        getNextNode: function(t, n) {
                            if (!n) return null;
                            for (var o = n.parentTId ? n.getParentNode() : e.getRoot(t), r = 0, a = (o = e.nodeChildren(t, o)).length - 1; r <= a; r++) if (o[r] === n) return r == a ? null: o[r + 1];
                            return null
                        },
                        getNodeByParam: function(t, n, o, r) {
                            if (!n || !o) return null;
                            for (var a = 0,
                                     i = n.length; a < i; a++) {
                                var d = n[a];
                                if (d[o] == r) return n[a];
                                if (d = e.nodeChildren(t, d), d = e.getNodeByParam(t, d, o, r)) return d
                            }
                            return null
                        },
                        getNodeCache: function(t, n) {
                            if (!n) return null;
                            var o = x[t.treeId].nodes[e.getNodeCacheId(n)];
                            return o || null
                        },
                        getNodePath: function(e, t) {
                            return t ? ((n = t.parentTId ? t.getParentNode().getPath() : []) && n.push(t), n) : null;
                            var n
                        }, getNodes: function(t) {
                            return e.nodeChildren(t, e.getRoot(t))
                        },
                        getNodesByParam: function(t, n, o, r) {
                            if (!n || !o) return [];
                            for (var a = [], i = 0, d = n.length; i < d; i++) {
                                var l = n[i];
                                l[o] == r && a.push(l),
                                    l = e.nodeChildren(t, l),
                                    a = a.concat(e.getNodesByParam(t, l, o, r))
                            }
                            return a
                        },
                        getNodesByParamFuzzy: function(t, n, o, r) {
                            if (!n || !o) return [];
                            for (var a = [], i = (r = r.toLowerCase(), 0), d = n.length; i < d; i++) {
                                var l = n[i];
                                "string" == typeof l[o] && -1 < n[i][o].toLowerCase().indexOf(r) && a.push(l),
                                    l = e.nodeChildren(t, l),
                                    a = a.concat(e.getNodesByParamFuzzy(t, l, o, r))
                            }
                            return a
                        },
                        getNodesByFilter: function(t, n, o, r, a) {
                            if (!n) return r ? null: [];
                            for (var i = r ? null: [], d = 0, l = n.length; d < l; d++) {
                                var s = n[d];
                                if (h.apply(o, [s, a], !1)) {
                                    if (r) return s;
                                    i.push(s)
                                }
                                if (s = e.nodeChildren(t, s), s = e.getNodesByFilter(t, s, o, r, a), r && s) return s;
                                i = r ? s: i.concat(s)
                            }
                            return i
                        },
                        getPreNode: function(t, n) {
                            if (!n) return null;
                            for (var o = n.parentTId ? n.getParentNode() : e.getRoot(t), r = 0, a = (o = e.nodeChildren(t, o)).length; r < a; r++) if (o[r] === n) return 0 == r ? null: o[r - 1];
                            return null
                        },
                        getRoot: function(e) {
                            return e ? w[e.treeId] : null
                        },
                        getRoots: function() {
                            return w
                        },
                        getSetting: function(e) {
                            return t[e]
                        },
                        getSettings: function() {
                            return t
                        },
                        getZTreeTools: function(e) {
                            return (e = this.getRoot(this.getSetting(e))) ? e.treeTools: null
                        },
                        initCache: function(e) {
                            for (var t = 0,
                                     n = A.length; t < n; t++) A[t].apply(this, arguments)
                        },
                        initNode: function(e, t, n, o, r, a) {
                            for (var i = 0,
                                     d = B.length; i < d; i++) B[i].apply(this, arguments)
                        },
                        initRoot: function(e) {
                            for (var t = 0,
                                     n = C.length; t < n; t++) C[t].apply(this, arguments)
                        },
                        isSelectedNode: function(t, n) {
                            for (var o = e.getRoot(t), r = 0, a = o.curSelectedList.length; r < a; r++) if (n === o.curSelectedList[r]) return ! 0;
                            return ! 1
                        },
                        nodeChildren: function(e, t, n) {
                            return t ? (e = e.data.key.children, void 0 !== n && (t[e] = n), t[e]) : null
                        },
                        nodeIsParent: function(e, t, n) {
                            return !! t && (e = e.data.key.isParent, void 0 !== n && ("string" == typeof n && (n = h.eqs(n, "true")), t[e] = !!n), t[e])
                        },
                        nodeName: function(e, t, n) {
                            return e = e.data.key.name,
                            void 0 !== n && (t[e] = n),
                            "" + t[e]
                        },
                        nodeTitle: function(e, t) {
                            return "" + t["" === e.data.key.title ? e.data.key.name: e.data.key.title]
                        },
                        removeNodeCache: function(t, n) {
                            var o = e.nodeChildren(t, n);
                            if (o) for (var r = 0,
                                            a = o.length; r < a; r++) e.removeNodeCache(t, o[r]);
                            e.getCache(t).nodes[e.getNodeCacheId(n.tId)] = null
                        },
                        removeSelectedNode: function(t, n) {
                            for (var o = e.getRoot(t), r = 0, a = o.curSelectedList.length; r < a; r++) n !== o.curSelectedList[r] && e.getNodeCache(t, o.curSelectedList[r].tId) || (o.curSelectedList.splice(r, 1), t.treeObj.trigger(g.event.UNSELECTED, [t.treeId, n]), r--, a--)
                        },
                        setCache: function(e, t) {
                            x[e.treeId] = t
                        },
                        setRoot: function(e, t) {
                            w[e.treeId] = t
                        },
                        setZTreeTools: function(e, t) {
                            for (var n = 0,
                                     o = H.length; n < o; n++) H[n].apply(this, arguments)
                        },
                        transformToArrayFormat: function(n, t) {
                            function o(t) {
                                r.push(t),
                                (t = e.nodeChildren(n, t)) && (r = r.concat(e.transformToArrayFormat(n, t)))
                            }
                            if (!t) return [];
                            var r = [];
                            if (h.isArray(t)) for (var a = 0,
                                                       i = t.length; a < i; a++) o(t[a]);
                            else o(t);
                            return r
                        },
                        transformTozTreeFormat: function(t, n) {
                            var o, r, a = t.data.simpleData.idKey,
                                i = t.data.simpleData.pIdKey;
                            if (!a || "" == a || !n) return [];
                            if (h.isArray(n)) {
                                var d = [],
                                    l = {};
                                for (o = 0, r = n.length; o < r; o++) l[n[o][a]] = n[o];
                                for (o = 0, r = n.length; o < r; o++) {
                                    var s = l[n[o][i]];
                                    if (s && n[o][a] != n[o][i]) {
                                        var c = e.nodeChildren(t, s);
                                        c || (c = e.nodeChildren(t, s, [])),
                                            c.push(n[o])
                                    } else d.push(n[o])
                                }
                                return d
                            }
                            return [n]
                        }
                    },
                    n = {
                        bindEvent: function(e) {
                            for (var t = 0,
                                     n = y.length; t < n; t++) y[t].apply(this, arguments)
                        },
                        unbindEvent: function(e) {
                            for (var t = 0,
                                     n = z.length; t < n; t++) z[t].apply(this, arguments)
                        },
                        bindTree: function(e) {
                            var t = {
                                    treeId: e.treeId
                                },
                                o = e.treeObj;
                            e.view.txtSelectedEnable || o.bind("selectstart", v).css({
                                "-moz-user-select": "-moz-none"
                            }),
                                o.bind("click", t, n.proxy),
                                o.bind("dblclick", t, n.proxy),
                                o.bind("mouseover", t, n.proxy),
                                o.bind("mouseout", t, n.proxy),
                                o.bind("mousedown", t, n.proxy),
                                o.bind("mouseup", t, n.proxy),
                                o.bind("contextmenu", t, n.proxy)
                        },
                        unbindTree: function(e) {
                            e.treeObj.unbind("selectstart", v).unbind("click", n.proxy).unbind("dblclick", n.proxy).unbind("mouseover", n.proxy).unbind("mouseout", n.proxy).unbind("mousedown", n.proxy).unbind("mouseup", n.proxy).unbind("contextmenu", n.proxy)
                        },
                        doProxy: function(e) {
                            for (var t = [], n = 0, o = u.length; n < o; n++) {
                                var r = u[n].apply(this, arguments);
                                if (t.push(r), r.stop) break
                            }
                            return t
                        },
                        proxy: function(t) {
                            var o = e.getSetting(t.data.treeId);
                            if (!h.uCanDo(o, t)) return ! 0;
                            for (var r = !0,
                                     a = 0,
                                     i = (o = n.doProxy(t)).length; a < i; a++) {
                                var d = o[a];
                                d.nodeEventCallback && (r = d.nodeEventCallback.apply(d, [t, d.node]) && r),
                                d.treeEventCallback && (r = d.treeEventCallback.apply(d, [t, d.node]) && r)
                            }
                            return r
                        }
                    };
                J = function(t, n) {
                    var o = e.getSetting(t.data.treeId);
                    if (n.open) {
                        if (0 == h.apply(o.callback.beforeCollapse, [o.treeId, n], !0)) return ! 0
                    } else if (0 == h.apply(o.callback.beforeExpand, [o.treeId, n], !0)) return ! 0;
                    return e.getRoot(o).expandTriggerFlag = !0,
                        j.switchNode(o, n),
                        !0
                },
                    K = function(t, n) {
                        var o = e.getSetting(t.data.treeId),
                            r = o.view.autoCancelSelected && (t.ctrlKey || t.metaKey) && e.isSelectedNode(o, n) ? 0 : o.view.autoCancelSelected && (t.ctrlKey || t.metaKey) && o.view.selectedMulti ? 2 : 1;
                        return 0 == h.apply(o.callback.beforeClick, [o.treeId, n, r], !0) || (0 === r ? j.cancelPreSelectedNode(o, n) : j.selectNode(o, n, 2 === r), o.treeObj.trigger(g.event.CLICK, [t, o.treeId, n, r])),
                            !0
                    },
                    L = function(t, n) {
                        var o = e.getSetting(t.data.treeId);
                        return h.apply(o.callback.beforeMouseDown, [o.treeId, n], !0) && h.apply(o.callback.onMouseDown, [t, o.treeId, n]),
                            !0
                    },
                    M = function(t, n) {
                        var o = e.getSetting(t.data.treeId);
                        return h.apply(o.callback.beforeMouseUp, [o.treeId, n], !0) && h.apply(o.callback.onMouseUp, [t, o.treeId, n]),
                            !0
                    },
                    N = function(t, n) {
                        var o = e.getSetting(t.data.treeId);
                        return h.apply(o.callback.beforeDblClick, [o.treeId, n], !0) && h.apply(o.callback.onDblClick, [t, o.treeId, n]),
                            !0
                    },
                    O = function(t, n) {
                        var o = e.getSetting(t.data.treeId);
                        return h.apply(o.callback.beforeRightClick, [o.treeId, n], !0) && h.apply(o.callback.onRightClick, [t, o.treeId, n]),
                        "function" != typeof o.callback.onRightClick
                    },
                    v = function(e) {
                        return "input" === (e = e.originalEvent.srcElement.nodeName.toLowerCase()) || "textarea" === e
                    };
                var h = {
                        apply: function(e, t, n) {
                            return "function" == typeof e ? e.apply(Q, t || []) : n
                        },
                        canAsync: function(t, n) {
                            var o = e.nodeChildren(t, n),
                                r = e.nodeIsParent(t, n);
                            return t.async.enable && n && r && !(n.zAsync || o && 0 < o.length)
                        },
                        clone: function(e) {
                            if (null === e) return null;
                            var t, n = h.isArray(e) ? [] : {};
                            for (t in e) n[t] = e[t] instanceof Date ? new Date(e[t].getTime()) : "object" == typeof e[t] ? h.clone(e[t]) : e[t];
                            return n
                        },
                        eqs: function(e, t) {
                            return e.toLowerCase() === t.toLowerCase()
                        },
                        isArray: function(e) {
                            return "[object Array]" === Object.prototype.toString.apply(e)
                        },
                        isElement: function(e) {
                            return "object" == typeof HTMLElement ? e instanceof HTMLElement: e && "object" == typeof e && null !== e && 1 === e.nodeType && "string" == typeof e.nodeName
                        },
                        $: function(e, t, n) {
                            return t && "string" != typeof t && (n = t, t = ""),
                                "string" == typeof e ? r(e, n ? n.treeObj.get(0).ownerDocument: null) : r("#" + e.tId + t, n ? n.treeObj: null)
                        },
                        getMDom: function(e, t, n) {
                            if (!t) return null;
                            for (; t && t.id !== e.treeId;) {
                                for (var o = 0,
                                         r = n.length; t.tagName && o < r; o++) if (h.eqs(t.tagName, n[o].tagName) && null !== t.getAttribute(n[o].attrName)) return t;
                                t = t.parentNode
                            }
                            return null
                        },
                        getNodeMainDom: function(e) {
                            return r(e).parent("li").get(0) || r(e).parentsUntil("li").parent().get(0)
                        },
                        isChildOrSelf: function(e, t) {
                            return 0 < r(e).closest("#" + t).length
                        },
                        uCanDo: function() {
                            return ! 0
                        }
                    },
                    j = {
                        addNodes: function(t, n, o, r, a) {
                            var i = e.nodeIsParent(t, n);
                            if (!t.data.keep.leaf || !n || i) if (h.isArray(r) || (r = [r]), t.data.simpleData.enable && (r = e.transformTozTreeFormat(t, r)), n) {
                                i = l(n, g.id.SWITCH, t);
                                var d = l(n, g.id.ICON, t),
                                    s = l(n, g.id.UL, t);
                                n.open || (j.replaceSwitchClass(n, i, g.folder.CLOSE), j.replaceIcoClass(n, d, g.folder.CLOSE), n.open = !1, s.css({
                                    display: "none"
                                })),
                                    e.addNodesData(t, n, o, r),
                                    j.createNodes(t, n.level + 1, r, n, o),
                                a || j.expandCollapseParentNode(t, n, !0)
                            } else e.addNodesData(t, e.getRoot(t), o, r),
                                j.createNodes(t, 0, r, null, o)
                        },
                        appendNodes: function(t, n, o, r, a, i, d) {
                            if (!o) return [];
                            var l, s, c = [],
                                u = r || e.getRoot(t); (!(u = e.nodeChildren(t, u)) || a >= u.length - o.length) && (a = -1);
                            for (var p = 0,
                                     h = o.length; p < h; p++) {
                                var g = o[p];
                                i && (l = (0 === a || u.length == o.length) && 0 == p, s = a < 0 && p == o.length - 1, e.initNode(t, n, g, r, l, s, d), e.addNodeCache(t, g)),
                                    l = e.nodeIsParent(t, g),
                                    s = [];
                                var f = e.nodeChildren(t, g);
                                f && 0 < f.length && (s = j.appendNodes(t, n + 1, f, g, -1, i, d && g.open)),
                                d && (j.makeDOMNodeMainBefore(c, t, g), j.makeDOMNodeLine(c, t, g), e.getBeforeA(t, g, c), j.makeDOMNodeNameBefore(c, t, g), e.getInnerBeforeA(t, g, c), j.makeDOMNodeIcon(c, t, g), e.getInnerAfterA(t, g, c), j.makeDOMNodeNameAfter(c, t, g), e.getAfterA(t, g, c), l && g.open && j.makeUlHtml(t, g, c, s.join("")), j.makeDOMNodeMainAfter(c, t, g), e.addCreatedNode(t, g))
                            }
                            return c
                        },
                        appendParentULDom: function(t, n) {
                            var o = [],
                                r = l(n, t); ! r.get(0) && n.parentTId && (j.appendParentULDom(t, n.getParentNode()), r = l(n, t));
                            var a = l(n, g.id.UL, t);
                            a.get(0) && a.remove(),
                                a = e.nodeChildren(t, n),
                                a = j.appendNodes(t, n.level + 1, a, n, -1, !1, !0),
                                j.makeUlHtml(t, n, o, a.join("")),
                                r.append(o.join(""))
                        },
                        asyncNode: function(a, b, c, d) {
                            var f, i;
                            if (f = e.nodeIsParent(a, b), b && !f) return h.apply(d),
                                !1;
                            if (b && b.isAjaxing) return ! 1;
                            if (0 == h.apply(a.callback.beforeAsync, [a.treeId, b], !0)) return h.apply(d),
                                !1;
                            b && (b.isAjaxing = !0, l(b, g.id.ICON, a).attr({
                                style: "",
                                class: g.className.BUTTON + " " + g.className.ICO_LOADING
                            }));
                            var m = {},
                                k = h.apply(a.async.autoParam, [a.treeId, b], a.async.autoParam);
                            for (f = 0, i = k.length; b && f < i; f++) {
                                var q = k[f].split("="),
                                    o = q;
                                1 < q.length && (o = q[1], q = q[0]),
                                    m[o] = b[q]
                            }
                            if (k = h.apply(a.async.otherParam, [a.treeId, b], a.async.otherParam), h.isArray(k)) for (f = 0, i = k.length; f < i; f += 2) m[k[f]] = k[f + 1];
                            else for (var n in k) m[n] = k[n];
                            var s = e.getRoot(a)._ver;
                            return r.ajax({
                                contentType: a.async.contentType,
                                cache: !1,
                                type: a.async.type,
                                url: h.apply(a.async.url, [a.treeId, b], a.async.url),
                                data: -1 < a.async.contentType.indexOf("application/json") ? JSON.stringify(m) : m,
                                dataType: a.async.dataType,
                                headers: a.async.headers,
                                xhrFields: a.async.xhrFields,
                                success: function(i) {
                                    if (s == e.getRoot(a)._ver) {
                                        var f = [];
                                        try {
                                            f = i && 0 != i.length ? "string" == typeof i ? eval("(" + i + ")") : i: []
                                        } catch(e) {
                                            f = i
                                        }
                                        b && (b.isAjaxing = null, b.zAsync = !0),
                                            j.setNodeLineIcos(a, b),
                                            f && "" !== f ? (f = h.apply(a.async.dataFilter, [a.treeId, b, f], f), j.addNodes(a, b, -1, f ? h.clone(f) : [], !!c)) : j.addNodes(a, b, -1, [], !!c),
                                            a.treeObj.trigger(g.event.ASYNC_SUCCESS, [a.treeId, b, i]),
                                            h.apply(d)
                                    }
                                },
                                error: function(t, n, o) {
                                    s == e.getRoot(a)._ver && (b && (b.isAjaxing = null), j.setNodeLineIcos(a, b), a.treeObj.trigger(g.event.ASYNC_ERROR, [a.treeId, b, t, n, o]))
                                }
                            }),
                                !0
                        },
                        cancelPreSelectedNode: function(t, n, o) {
                            var r, a, i = e.getRoot(t).curSelectedList;
                            for (r = i.length - 1; 0 <= r; r--) if (n === (a = i[r]) || !n && (!o || o !== a)) {
                                if (l(a, g.id.A, t).removeClass(g.node.CURSELECTED), n) {
                                    e.removeSelectedNode(t, n);
                                    break
                                }
                                i.splice(r, 1),
                                    t.treeObj.trigger(g.event.UNSELECTED, [t.treeId, a])
                            }
                        },
                        createNodeCallback: function(t) {
                            if (t.callback.onNodeCreated || t.view.addDiyDom) for (var n = e.getRoot(t); 0 < n.createdNodes.length;) {
                                var o = n.createdNodes.shift();
                                h.apply(t.view.addDiyDom, [t.treeId, o]),
                                t.callback.onNodeCreated && t.treeObj.trigger(g.event.NODECREATED, [t.treeId, o])
                            }
                        },
                        createNodes: function(t, n, o, a, i) {
                            if (o && 0 != o.length) {
                                var d = e.getRoot(t),
                                    s = !a || a.open || !!l(e.nodeChildren(t, a)[0], t).get(0);
                                d.createdNodes = [];
                                var c, u;
                                n = j.appendNodes(t, n, o, a, i, !0, s);
                                a ? (a = l(a, g.id.UL, t)).get(0) && (c = a) : c = t.treeObj,
                                c && (0 <= i && (u = c.children()[i]), 0 <= i && u ? r(u).before(n.join("")) : c.append(n.join(""))),
                                    j.createNodeCallback(t)
                            }
                        },
                        destroy: function(o) {
                            o && (e.initCache(o), e.initRoot(o), n.unbindTree(o), n.unbindEvent(o), o.treeObj.empty(), delete t[o.treeId])
                        },
                        expandCollapseNode: function(t, n, o, r, a) {
                            var i, d = e.getRoot(t);
                            if (n) {
                                var s = e.nodeChildren(t, n),
                                    c = e.nodeIsParent(t, n);
                                if (d.expandTriggerFlag && (i = a, a = function() {
                                    i && i(),
                                        n.open ? t.treeObj.trigger(g.event.EXPAND, [t.treeId, n]) : t.treeObj.trigger(g.event.COLLAPSE, [t.treeId, n])
                                },
                                    d.expandTriggerFlag = !1), !n.open && c && (!l(n, g.id.UL, t).get(0) || s && 0 < s.length && !l(s[0], t).get(0)) && (j.appendParentULDom(t, n), j.createNodeCallback(t)), n.open == o) h.apply(a, []);
                                else {
                                    o = l(n, g.id.UL, t),
                                        d = l(n, g.id.SWITCH, t);
                                    var u = l(n, g.id.ICON, t);
                                    c ? (n.open = !n.open, n.iconOpen && n.iconClose && u.attr("style", j.makeNodeIcoStyle(t, n)), n.open ? (j.replaceSwitchClass(n, d, g.folder.OPEN), j.replaceIcoClass(n, u, g.folder.OPEN), 0 == r || "" == t.view.expandSpeed ? (o.show(), h.apply(a, [])) : s && 0 < s.length ? o.slideDown(t.view.expandSpeed, a) : (o.show(), h.apply(a, []))) : (j.replaceSwitchClass(n, d, g.folder.CLOSE), j.replaceIcoClass(n, u, g.folder.CLOSE), 0 != r && "" != t.view.expandSpeed && s && 0 < s.length ? o.slideUp(t.view.expandSpeed, a) : (o.hide(), h.apply(a, [])))) : h.apply(a, [])
                                }
                            } else h.apply(a, [])
                        },
                        expandCollapseParentNode: function(e, t, n, o, r) {
                            t && (t.parentTId ? (j.expandCollapseNode(e, t, n, o), t.parentTId && j.expandCollapseParentNode(e, t.getParentNode(), n, o, r)) : j.expandCollapseNode(e, t, n, o, r))
                        },
                        expandCollapseSonNode: function(t, n, o, r, a) {
                            var i = e.getRoot(t),
                                d = (i = n ? e.nodeChildren(t, n) : e.nodeChildren(t, i), !n && r),
                                l = e.getRoot(t).expandTriggerFlag;
                            if (e.getRoot(t).expandTriggerFlag = !1, i) for (var s = 0,
                                                                                 c = i.length; s < c; s++) i[s] && j.expandCollapseSonNode(t, i[s], o, d);
                            e.getRoot(t).expandTriggerFlag = l,
                                j.expandCollapseNode(t, n, o, r, a)
                        },
                        isSelectedNode: function(t, n) {
                            if (!n) return ! 1;
                            var o, r = e.getRoot(t).curSelectedList;
                            for (o = r.length - 1; 0 <= o; o--) if (n === r[o]) return ! 0;
                            return ! 1
                        },
                        makeDOMNodeIcon: function(t, n, o) {
                            var r = e.nodeName(n, o);
                            r = n.view.nameIsHTML ? r: r.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                            t.push("<span id='", o.tId, g.id.ICON, "' title='' treeNode", g.id.ICON, " class='", j.makeNodeIcoClass(n, o), "' style='", j.makeNodeIcoStyle(n, o), "'></span><span id='", o.tId, g.id.SPAN, "' class='", g.className.NAME, "'>", r, "</span>")
                        },
                        makeDOMNodeLine: function(e, t, n) {
                            e.push("<span id='", n.tId, g.id.SWITCH, "' title='' class='", j.makeNodeLineClass(t, n), "' treeNode", g.id.SWITCH, "></span>")
                        },
                        makeDOMNodeMainAfter: function(e) {
                            e.push("</li>")
                        },
                        makeDOMNodeMainBefore: function(e, t, n) {
                            e.push("<li id='", n.tId, "' class='", g.className.LEVEL, n.level, "' tabindex='0' hidefocus='true' treenode>")
                        },
                        makeDOMNodeNameAfter: function(e) {
                            e.push("</a>")
                        },
                        makeDOMNodeNameBefore: function(t, n, o) {
                            var r, a = e.nodeTitle(n, o),
                                i = j.makeNodeUrl(n, o),
                                d = j.makeNodeFontCss(n, o),
                                l = [];
                            for (r in d) l.push(r, ":", d[r], ";");
                            t.push("<a id='", o.tId, g.id.A, "' class='", g.className.LEVEL, o.level, "' treeNode", g.id.A, ' onclick="', o.click || "", '" ', null != i && 0 < i.length ? "href='" + i + "'": "", " target='", j.makeNodeTarget(o), "' style='", l.join(""), "'"),
                            h.apply(n.view.showTitle, [n.treeId, o], n.view.showTitle) && a && t.push("title='", a.replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), "'"),
                                t.push(">")
                        },
                        makeNodeFontCss: function(e, t) {
                            var n = h.apply(e.view.fontCss, [e.treeId, t], e.view.fontCss);
                            return n && "function" != typeof n ? n: {}
                        },
                        makeNodeIcoClass: function(t, n) {
                            var o = ["ico"];
                            if (!n.isAjaxing) {
                                var r = e.nodeIsParent(t, n);
                                o[0] = (n.iconSkin ? n.iconSkin + "_": "") + o[0],
                                    r ? o.push(n.open ? g.folder.OPEN: g.folder.CLOSE) : o.push(g.folder.DOCU)
                            }
                            return g.className.BUTTON + " " + o.join("_")
                        },
                        makeNodeIcoStyle: function(t, n) {
                            var o = [];
                            if (!n.isAjaxing) {
                                var r = e.nodeIsParent(t, n) && n.iconOpen && n.iconClose ? n.open ? n.iconOpen: n.iconClose: n[t.data.key.icon];
                                r && o.push("background:url(", r, ") 0 0 no-repeat;"),
                                (0 == t.view.showIcon || !h.apply(t.view.showIcon, [t.treeId, n], !0)) && o.push("width:0px;height:0px;")
                            }
                            return o.join("")
                        },
                        makeNodeLineClass: function(t, n) {
                            var o = [];
                            return t.view.showLine ? 0 == n.level && n.isFirstNode && n.isLastNode ? o.push(g.line.ROOT) : 0 == n.level && n.isFirstNode ? o.push(g.line.ROOTS) : n.isLastNode ? o.push(g.line.BOTTOM) : o.push(g.line.CENTER) : o.push(g.line.NOLINE),
                                e.nodeIsParent(t, n) ? o.push(n.open ? g.folder.OPEN: g.folder.CLOSE) : o.push(g.folder.DOCU),
                            j.makeNodeLineClassEx(n) + o.join("_")
                        },
                        makeNodeLineClassEx: function(e) {
                            return g.className.BUTTON + " " + g.className.LEVEL + e.level + " " + g.className.SWITCH + " "
                        },
                        makeNodeTarget: function(e) {
                            return e.target || "_blank"
                        },
                        makeNodeUrl: function(e, t) {
                            var n = e.data.key.url;
                            return t[n] ? t[n] : null
                        },
                        makeUlHtml: function(e, t, n, o) {
                            n.push("<ul id='", t.tId, g.id.UL, "' class='", g.className.LEVEL, t.level, " ", j.makeUlLineClass(e, t), "' style='display:", t.open ? "block": "none", "'>"),
                                n.push(o),
                                n.push("</ul>")
                        },
                        makeUlLineClass: function(e, t) {
                            return e.view.showLine && !t.isLastNode ? g.line.LINE: ""
                        },
                        removeChildNodes: function(t, n) {
                            if (n) {
                                var o = e.nodeChildren(t, n);
                                if (o) {
                                    for (var r = 0,
                                             a = o.length; r < a; r++) e.removeNodeCache(t, o[r]);
                                    e.removeSelectedNode(t),
                                        delete n[t.data.key.children],
                                        t.data.keep.parent ? l(n, g.id.UL, t).empty() : (e.nodeIsParent(t, n, !1), n.open = !1, o = l(n, g.id.SWITCH, t), r = l(n, g.id.ICON, t), j.replaceSwitchClass(n, o, g.folder.DOCU), j.replaceIcoClass(n, r, g.folder.DOCU), l(n, g.id.UL, t).remove())
                                }
                            }
                        },
                        scrollIntoView: function(e, t) {
                            if (t) if ("undefined" == typeof Element) {
                                var n = e.treeObj.get(0).getBoundingClientRect(),
                                    o = t.getBoundingClientRect(); (o.top < n.top || o.bottom > n.bottom || o.right > n.right || o.left < n.left) && t.scrollIntoView()
                            } else Element.prototype.scrollIntoViewIfNeeded || (Element.prototype.scrollIntoViewIfNeeded = function(n) {
                                function e(e, t) {
                                    return {
                                        start: e,
                                        length: t,
                                        end: e + t
                                    }
                                }
                                function t(e, t) {
                                    return ! 1 === n || t.start < e.end && e.start < t.end ? Math.max(e.end - t.length, Math.min(t.start, e.start)) : (e.start + e.end - t.length) / 2
                                }
                                function r(n, o) {
                                    return {
                                        x: n,
                                        y: o,
                                        translate: function(e, t) {
                                            return r(n + e, o + t)
                                        }
                                    }
                                }
                                function o(e, t) {
                                    for (; e;) t = t.translate(e.offsetLeft, e.offsetTop),
                                        e = e.offsetParent;
                                    return t
                                }
                                for (var a, i = o(this, r(0, 0)), d = r(this.offsetWidth, this.offsetHeight), l = this.parentNode; l instanceof HTMLElement;) a = o(l, r(l.clientLeft, l.clientTop)),
                                    l.scrollLeft = t(e(i.x - a.x, d.x), e(l.scrollLeft, l.clientWidth)),
                                    l.scrollTop = t(e(i.y - a.y, d.y), e(l.scrollTop, l.clientHeight)),
                                    i = i.translate( - l.scrollLeft, -l.scrollTop),
                                    l = l.parentNode
                            }),
                                t.scrollIntoViewIfNeeded()
                        },
                        setFirstNode: function(t, n) {
                            var o = e.nodeChildren(t, n);
                            0 < o.length && (o[0].isFirstNode = !0)
                        },
                        setLastNode: function(t, n) {
                            var o = e.nodeChildren(t, n);
                            0 < o.length && (o[o.length - 1].isLastNode = !0)
                        },
                        removeNode: function(t, n) {
                            var o = e.getRoot(t),
                                r = n.parentTId ? n.getParentNode() : o;
                            if (n.isFirstNode = !1, n.isLastNode = !1, n.getPreNode = function() {
                                return null
                            },
                                n.getNextNode = function() {
                                    return null
                                },
                                e.getNodeCache(t, n.tId)) {
                                l(n, t).remove(),
                                    e.removeNodeCache(t, n),
                                    e.removeSelectedNode(t, n);
                                for (var a = e.nodeChildren(t, r), i = 0, d = a.length; i < d; i++) if (a[i].tId == n.tId) {
                                    a.splice(i, 1);
                                    break
                                }
                                j.setFirstNode(t, r),
                                    j.setLastNode(t, r);
                                var s;
                                i = a.length;
                                if (t.data.keep.parent || 0 != i) {
                                    if (t.view.showLine && 0 < i) {
                                        var c = a[i - 1];
                                        i = l(c, g.id.UL, t),
                                            d = l(c, g.id.SWITCH, t);
                                        s = l(c, g.id.ICON, t),
                                            r == o ? 1 == a.length ? j.replaceSwitchClass(c, d, g.line.ROOT) : (o = l(a[0], g.id.SWITCH, t), j.replaceSwitchClass(a[0], o, g.line.ROOTS), j.replaceSwitchClass(c, d, g.line.BOTTOM)) : j.replaceSwitchClass(c, d, g.line.BOTTOM),
                                            i.removeClass(g.line.LINE)
                                    }
                                } else e.nodeIsParent(t, r, !1),
                                    r.open = !1,
                                    delete r[t.data.key.children],
                                    i = l(r, g.id.UL, t),
                                    d = l(r, g.id.SWITCH, t),
                                    s = l(r, g.id.ICON, t),
                                    j.replaceSwitchClass(r, d, g.folder.DOCU),
                                    j.replaceIcoClass(r, s, g.folder.DOCU),
                                    i.css("display", "none")
                            }
                        },
                        replaceIcoClass: function(e, t, n) {
                            if (t && !e.isAjaxing && null != (e = t.attr("class"))) {
                                switch (e = e.split("_"), n) {
                                    case g.folder.OPEN:
                                    case g.folder.CLOSE:
                                    case g.folder.DOCU:
                                        e[e.length - 1] = n
                                }
                                t.attr("class", e.join("_"))
                            }
                        },
                        replaceSwitchClass: function(e, t, n) {
                            if (t) {
                                var o = t.attr("class");
                                if (null != o) {
                                    switch (o = o.split("_"), n) {
                                        case g.line.ROOT:
                                        case g.line.ROOTS:
                                        case g.line.CENTER:
                                        case g.line.BOTTOM:
                                        case g.line.NOLINE:
                                            o[0] = j.makeNodeLineClassEx(e) + n;
                                            break;
                                        case g.folder.OPEN:
                                        case g.folder.CLOSE:
                                        case g.folder.DOCU:
                                            o[1] = n
                                    }
                                    t.attr("class", o.join("_")),
                                        n !== g.folder.DOCU ? t.removeAttr("disabled") : t.attr("disabled", "disabled")
                                }
                            }
                        },
                        selectNode: function(t, n, o) {
                            o || j.cancelPreSelectedNode(t, null, n),
                                l(n, g.id.A, t).addClass(g.node.CURSELECTED),
                                e.addSelectedNode(t, n),
                                t.treeObj.trigger(g.event.SELECTED, [t.treeId, n])
                        },
                        setNodeFontCss: function(e, t) {
                            var n = l(t, g.id.A, e),
                                o = j.makeNodeFontCss(e, t);
                            o && n.css(o)
                        },
                        setNodeLineIcos: function(t, n) {
                            if (n) {
                                var o = l(n, g.id.SWITCH, t),
                                    r = l(n, g.id.UL, t),
                                    a = l(n, g.id.ICON, t),
                                    i = j.makeUlLineClass(t, n);
                                0 == i.length ? r.removeClass(g.line.LINE) : r.addClass(i),
                                    o.attr("class", j.makeNodeLineClass(t, n)),
                                    e.nodeIsParent(t, n) ? o.removeAttr("disabled") : o.attr("disabled", "disabled"),
                                    a.removeAttr("style"),
                                    a.attr("style", j.makeNodeIcoStyle(t, n)),
                                    a.attr("class", j.makeNodeIcoClass(t, n))
                            }
                        },
                        setNodeName: function(t, n) {
                            var o = e.nodeTitle(t, n),
                                r = l(n, g.id.SPAN, t);
                            r.empty(),
                                t.view.nameIsHTML ? r.html(e.nodeName(t, n)) : r.text(e.nodeName(t, n)),
                            h.apply(t.view.showTitle, [t.treeId, n], t.view.showTitle) && l(n, g.id.A, t).attr("title", o || "")
                        },
                        setNodeTarget: function(e, t) {
                            l(t, g.id.A, e).attr("target", j.makeNodeTarget(t))
                        },
                        setNodeUrl: function(e, t) {
                            var n = l(t, g.id.A, e),
                                o = j.makeNodeUrl(e, t);
                            null == o || 0 == o.length ? n.removeAttr("href") : n.attr("href", o)
                        },
                        switchNode: function(e, t) {
                            t.open || !h.canAsync(e, t) ? j.expandCollapseNode(e, t, !t.open) : e.async.enable ? j.asyncNode(e, t) || j.expandCollapseNode(e, t, !t.open) : t && j.expandCollapseNode(e, t, !t.open)
                        }
                    };
                r.fn.zTree = {
                    consts: {
                        className: {
                            BUTTON: "button",
                            LEVEL: "level",
                            ICO_LOADING: "ico_loading",
                            SWITCH: "switch",
                            NAME: "node_name"
                        },
                        event: {
                            NODECREATED: "ztree_nodeCreated",
                            CLICK: "ztree_click",
                            EXPAND: "ztree_expand",
                            COLLAPSE: "ztree_collapse",
                            ASYNC_SUCCESS: "ztree_async_success",
                            ASYNC_ERROR: "ztree_async_error",
                            REMOVE: "ztree_remove",
                            SELECTED: "ztree_selected",
                            UNSELECTED: "ztree_unselected"
                        },
                        id: {
                            A: "_a",
                            ICON: "_ico",
                            SPAN: "_span",
                            SWITCH: "_switch",
                            UL: "_ul"
                        },
                        line: {
                            ROOT: "root",
                            ROOTS: "roots",
                            CENTER: "center",
                            BOTTOM: "bottom",
                            NOLINE: "noline",
                            LINE: "line"
                        },
                        folder: {
                            OPEN: "open",
                            CLOSE: "close",
                            DOCU: "docu"
                        },
                        node: {
                            CURSELECTED: "curSelectedNode"
                        }
                    },
                    _z: {
                        tools: h,
                        view: j,
                        event: n,
                        data: e
                    },
                    getZTreeObj: function(t) {
                        return (t = e.getZTreeTools(t)) ? t: null
                    },
                    destroy: function(n) {
                        if (n && 0 < n.length) j.destroy(e.getSetting(n));
                        else for (var o in t) j.destroy(t[o])
                    },
                    init: function(o, a, i) {
                        var s = h.clone(P);
                        r.extend(!0, s, a),
                            s.treeId = o.attr("id"),
                            s.treeObj = o,
                            s.treeObj.empty(),
                            t[s.treeId] = s,
                        void 0 === document.body.style.maxHeight && (s.view.expandSpeed = ""),
                            e.initRoot(s),
                            o = e.getRoot(s),
                            i = i ? h.clone(h.isArray(i) ? i: [i]) : [],
                            s.data.simpleData.enable ? e.nodeChildren(s, o, e.transformTozTreeFormat(s, i)) : e.nodeChildren(s, o, i),
                            e.initCache(s),
                            n.unbindTree(s),
                            n.bindTree(s),
                            n.unbindEvent(s),
                            n.bindEvent(s);
                        var d = {
                            setting: s,
                            addNodes: function(t, n, o, r) {
                                function a() {
                                    j.addNodes(s, t, n, d, 1 == r)
                                }
                                t || (t = null);
                                var i = e.nodeIsParent(s, t);
                                if (t && !i && s.data.keep.leaf) return null;
                                if (i = parseInt(n, 10), isNaN(i) ? (r = !!o, o = n, n = -1) : n = i, !o) return null;
                                var d = h.clone(h.isArray(o) ? o: [o]);
                                return h.canAsync(s, t) ? j.asyncNode(s, t, r, a) : a(),
                                    d
                            },
                            cancelSelectedNode: function(e) {
                                j.cancelPreSelectedNode(s, e)
                            },
                            destroy: function() {
                                j.destroy(s)
                            },
                            expandAll: function(e) {
                                return e = !!e,
                                    j.expandCollapseSonNode(s, null, e, !0),
                                    e
                            },
                            expandNode: function(t, n, o, r, a) {
                                function i() {
                                    var e = l(t, s).get(0);
                                    e && !1 !== r && j.scrollIntoView(s, e)
                                }
                                return t && e.nodeIsParent(s, t) ? (!0 !== n && !1 !== n && (n = !t.open), (a = !!a) && n && 0 == h.apply(s.callback.beforeExpand, [s.treeId, t], !0) ? null: a && !n && 0 == h.apply(s.callback.beforeCollapse, [s.treeId, t], !0) ? null: (n && t.parentTId && j.expandCollapseParentNode(s, t.getParentNode(), n, !1), n !== t.open || o ? (e.getRoot(s).expandTriggerFlag = a, !h.canAsync(s, t) && o ? j.expandCollapseSonNode(s, t, n, !0, i) : (t.open = !n, j.switchNode(this.setting, t), i()), n) : null)) : null
                            },
                            getNodes: function() {
                                return e.getNodes(s)
                            },
                            getNodeByParam: function(t, n, o) {
                                return t ? e.getNodeByParam(s, o ? e.nodeChildren(s, o) : e.getNodes(s), t, n) : null
                            },
                            getNodeByTId: function(t) {
                                return e.getNodeCache(s, t)
                            },
                            getNodesByParam: function(t, n, o) {
                                return t ? e.getNodesByParam(s, o ? e.nodeChildren(s, o) : e.getNodes(s), t, n) : null
                            },
                            getNodesByParamFuzzy: function(t, n, o) {
                                return t ? e.getNodesByParamFuzzy(s, o ? e.nodeChildren(s, o) : e.getNodes(s), t, n) : null
                            },
                            getNodesByFilter: function(t, n, o, r) {
                                return n = !!n,
                                    t && "function" == typeof t ? e.getNodesByFilter(s, o ? e.nodeChildren(s, o) : e.getNodes(s), t, n, r) : n ? null: []
                            },
                            getNodeIndex: function(t) {
                                if (!t) return null;
                                for (var n = t.parentTId ? t.getParentNode() : e.getRoot(s), o = 0, r = (n = e.nodeChildren(s, n)).length; o < r; o++) if (n[o] == t) return o;
                                return - 1
                            },
                            getSelectedNodes: function() {
                                for (var t = [], n = e.getRoot(s).curSelectedList, o = 0, r = n.length; o < r; o++) t.push(n[o]);
                                return t
                            },
                            isSelectedNode: function(t) {
                                return e.isSelectedNode(s, t)
                            },
                            reAsyncChildNodesPromise: function(n, o, r) {
                                return new Promise(function(e, t) {
                                    try {
                                        d.reAsyncChildNodes(n, o, r,
                                            function() {
                                                e(n)
                                            })
                                    } catch(e) {
                                        t(e)
                                    }
                                })
                            },
                            reAsyncChildNodes: function(t, n, o, r) {
                                if (this.setting.async.enable) {
                                    var a = !t;
                                    if (a && (t = e.getRoot(s)), "refresh" == n) {
                                        for (var i = 0,
                                                 d = (n = e.nodeChildren(s, t)) ? n.length: 0; i < d; i++) e.removeNodeCache(s, n[i]);
                                        e.removeSelectedNode(s),
                                            e.nodeChildren(s, t, []),
                                            a ? this.setting.treeObj.empty() : l(t, g.id.UL, s).empty()
                                    }
                                    j.asyncNode(this.setting, a ? null: t, !!o, r)
                                }
                            },
                            refresh: function() {
                                this.setting.treeObj.empty();
                                var t = e.getRoot(s),
                                    n = e.nodeChildren(s, t);
                                e.initRoot(s),
                                    e.nodeChildren(s, t, n),
                                    e.initCache(s),
                                    j.createNodes(s, 0, e.nodeChildren(s, t), null, -1)
                            },
                            removeChildNodes: function(t) {
                                if (!t) return null;
                                var n = e.nodeChildren(s, t);
                                return j.removeChildNodes(s, t),
                                n || null
                            },
                            removeNode: function(e, t) {
                                e && ((t = !!t) && 0 == h.apply(s.callback.beforeRemove, [s.treeId, e], !0) || (j.removeNode(s, e), t && this.setting.treeObj.trigger(g.event.REMOVE, [s.treeId, e])))
                            },
                            selectNode: function(t, e, n) {
                                if (t && h.uCanDo(s)) {
                                    if (e = s.view.selectedMulti && e, t.parentTId) j.expandCollapseParentNode(s, t.getParentNode(), !0, !1,
                                        function() {
                                            if (!n) {
                                                var e = l(t, s).get(0);
                                                j.scrollIntoView(s, e)
                                            }
                                        });
                                    else if (!n) try {
                                        l(t, s).focus().blur()
                                    } catch(e) {}
                                    j.selectNode(s, t, e)
                                }
                            },
                            transformTozTreeNodes: function(t) {
                                return e.transformTozTreeFormat(s, t)
                            },
                            transformToArray: function(t) {
                                return e.transformToArrayFormat(s, t)
                            },
                            updateNode: function(e) {
                                e && l(e, s).get(0) && h.uCanDo(s) && (j.setNodeName(s, e), j.setNodeTarget(s, e), j.setNodeUrl(s, e), j.setNodeLineIcos(s, e), j.setNodeFontCss(s, e))
                            }
                        };
                        return o.treeTools = d,
                            e.setZTreeTools(s, d),
                            (i = e.nodeChildren(s, o)) && 0 < i.length ? j.createNodes(s, 0, i, null, -1) : s.async.enable && s.async.url && "" !== s.async.url && j.asyncNode(s),
                            d
                    }
                };
                var Q = r.fn.zTree,
                    l = h.$,
                    g = Q.consts
            } (jQuery),
            function(e) {
                var d, l, s, t = {
                        event: {
                            CHECK: "ztree_check"
                        },
                        id: {
                            CHECK: "_check"
                        },
                        checkbox: {
                            STYLE: "checkbox",
                            DEFAULT: "chk",
                            DISABLED: "disable",
                            FALSE: "false",
                            TRUE: "true",
                            FULL: "full",
                            PART: "part",
                            FOCUS: "focus"
                        },
                        radio: {
                            STYLE: "radio",
                            TYPE_ALL: "all",
                            TYPE_LEVEL: "level"
                        }
                    },
                    n = {
                        check: {
                            enable: !1,
                            autoCheckTrigger: !1,
                            chkStyle: t.checkbox.STYLE,
                            nocheckInherit: !1,
                            chkDisabledInherit: !1,
                            radioType: t.radio.TYPE_LEVEL,
                            chkboxType: {
                                Y: "ps",
                                N: "ps"
                            }
                        },
                        data: {
                            key: {
                                checked: "checked"
                            }
                        },
                        callback: {
                            beforeCheck: null,
                            onCheck: null
                        }
                    };
                d = function(e, t) {
                    if (!0 === t.chkDisabled) return ! 1;
                    var n = h.getSetting(e.data.treeId);
                    if (0 == c.apply(n.callback.beforeCheck, [n.treeId, t], !0)) return ! 0;
                    var o = h.nodeChecked(n, t);
                    return h.nodeChecked(n, t, !o),
                        p.checkNodeRelation(n, t),
                        o = g(t, u.id.CHECK, n),
                        p.setChkClass(n, o, t),
                        p.repairParentChkClassWithSelf(n, t),
                        n.treeObj.trigger(u.event.CHECK, [e, n.treeId, t]),
                        !0
                },
                    l = function(e, t) {
                        if (!0 === t.chkDisabled) return ! 1;
                        var n = h.getSetting(e.data.treeId),
                            o = g(t, u.id.CHECK, n);
                        return t.check_Focus = !0,
                            p.setChkClass(n, o, t),
                            !0
                    },
                    s = function(e, t) {
                        if (!0 === t.chkDisabled) return ! 1;
                        var n = h.getSetting(e.data.treeId),
                            o = g(t, u.id.CHECK, n);
                        return t.check_Focus = !1,
                            p.setChkClass(n, o, t),
                            !0
                    },
                    e.extend(!0, e.fn.zTree.consts, t),
                    e.extend(!0, e.fn.zTree._z, {
                        tools: {},
                        view: {
                            checkNodeRelation: function(e, t) {
                                var n, o, r;
                                if (o = u.radio, n = h.nodeChecked(e, t), e.check.chkStyle == o.STYLE) {
                                    var a = h.getRadioCheckedList(e);
                                    if (n) if (e.check.radioType == o.TYPE_ALL) {
                                        for (o = a.length - 1; 0 <= o; o--) {
                                            n = a[o];
                                            var i = h.nodeChecked(e, n);
                                            i && n != t && (h.nodeChecked(e, n, !1), a.splice(o, 1), p.setChkClass(e, g(n, u.id.CHECK, e), n), n.parentTId != t.parentTId && p.repairParentChkClassWithSelf(e, n))
                                        }
                                        a.push(t)
                                    } else for (a = t.parentTId ? t.getParentNode() : h.getRoot(e), o = 0, r = (a = h.nodeChildren(e, a)).length; o < r; o++) n = a[o],
                                    (i = h.nodeChecked(e, n)) && n != t && (h.nodeChecked(e, n, !1), p.setChkClass(e, g(n, u.id.CHECK, e), n));
                                    else if (e.check.radioType == o.TYPE_ALL) for (o = 0, r = a.length; o < r; o++) if (t == a[o]) {
                                        a.splice(o, 1);
                                        break
                                    }
                                } else a = h.nodeChildren(e, t),
                                n && (!a || 0 == a.length || -1 < e.check.chkboxType.Y.indexOf("s")) && p.setSonNodeCheckBox(e, t, !0),
                                !n && (!a || 0 == a.length || -1 < e.check.chkboxType.N.indexOf("s")) && p.setSonNodeCheckBox(e, t, !1),
                                n && -1 < e.check.chkboxType.Y.indexOf("p") && p.setParentNodeCheckBox(e, t, !0),
                                !n && -1 < e.check.chkboxType.N.indexOf("p") && p.setParentNodeCheckBox(e, t, !1)
                            },
                            makeChkClass: function(e, t) {
                                var n = u.checkbox,
                                    o = u.radio,
                                    r = h.nodeChecked(e, t),
                                    a = !0 === t.chkDisabled ? n.DISABLED: t.halfCheck ? n.PART: e.check.chkStyle == o.STYLE ? t.check_Child_State < 1 ? n.FULL: n.PART: r ? 2 === t.check_Child_State || -1 === t.check_Child_State ? n.FULL: n.PART: t.check_Child_State < 1 ? n.FULL: n.PART;
                                o = e.check.chkStyle + "_" + (r ? n.TRUE: n.FALSE) + "_" + a,
                                    o = t.check_Focus && !0 !== t.chkDisabled ? o + "_" + n.FOCUS: o;
                                return u.className.BUTTON + " " + n.DEFAULT + " " + o
                            },
                            repairAllChk: function(e, t) {
                                if (e.check.enable && e.check.chkStyle === u.checkbox.STYLE) for (var n = h.getRoot(e), o = 0, r = (n = h.nodeChildren(e, n)).length; o < r; o++) {
                                    var a = n[o]; ! 0 !== a.nocheck && !0 !== a.chkDisabled && h.nodeChecked(e, a, t),
                                        p.setSonNodeCheckBox(e, a, t)
                                }
                            },
                            repairChkClass: function(e, t) {
                                if (t && (h.makeChkFlag(e, t), !0 !== t.nocheck)) {
                                    var n = g(t, u.id.CHECK, e);
                                    p.setChkClass(e, n, t)
                                }
                            },
                            repairParentChkClass: function(e, t) {
                                if (t && t.parentTId) {
                                    var n = t.getParentNode();
                                    p.repairChkClass(e, n),
                                        p.repairParentChkClass(e, n)
                                }
                            },
                            repairParentChkClassWithSelf: function(e, t) {
                                if (t) {
                                    var n = h.nodeChildren(e, t);
                                    n && 0 < n.length ? p.repairParentChkClass(e, n[0]) : p.repairParentChkClass(e, t)
                                }
                            },
                            repairSonChkDisabled: function(e, t, n, o) {
                                if (t && (t.chkDisabled != n && (t.chkDisabled = n), p.repairChkClass(e, t), (t = h.nodeChildren(e, t)) && o)) for (var r = 0,
                                                                                                                                                        a = t.length; r < a; r++) p.repairSonChkDisabled(e, t[r], n, o)
                            },
                            repairParentChkDisabled: function(e, t, n, o) {
                                t && (t.chkDisabled != n && o && (t.chkDisabled = n), p.repairChkClass(e, t), p.repairParentChkDisabled(e, t.getParentNode(), n, o))
                            },
                            setChkClass: function(e, t, n) {
                                t && (!0 === n.nocheck ? t.hide() : t.show(), t.attr("class", p.makeChkClass(e, n)))
                            },
                            setParentNodeCheckBox: function(e, t, n, o) {
                                var r = g(t, u.id.CHECK, e);
                                if (o || (o = t), h.makeChkFlag(e, t), !0 !== t.nocheck && !0 !== t.chkDisabled && (h.nodeChecked(e, t, n), p.setChkClass(e, r, t), e.check.autoCheckTrigger && t != o && e.treeObj.trigger(u.event.CHECK, [null, e.treeId, t])), t.parentTId) {
                                    if (r = !0, !n) for (var a = h.nodeChildren(e, t.getParentNode()), i = 0, d = a.length; i < d; i++) {
                                        var l = a[i],
                                            s = h.nodeChecked(e, l);
                                        if (!0 !== l.nocheck && !0 !== l.chkDisabled && s || (!0 === l.nocheck || !0 === l.chkDisabled) && 0 < l.check_Child_State) {
                                            r = !1;
                                            break
                                        }
                                    }
                                    r && p.setParentNodeCheckBox(e, t.getParentNode(), n, o)
                                }
                            },
                            setSonNodeCheckBox: function(e, t, n, o) {
                                if (t) {
                                    var r = g(t, u.id.CHECK, e);
                                    o || (o = t);
                                    var a = !1,
                                        i = h.nodeChildren(e, t);
                                    if (i) for (var d = 0,
                                                    l = i.length; d < l; d++) {
                                        var s = i[d];
                                        p.setSonNodeCheckBox(e, s, n, o),
                                        !0 === s.chkDisabled && (a = !0)
                                    }
                                    t != h.getRoot(e) && !0 !== t.chkDisabled && (a && !0 !== t.nocheck && h.makeChkFlag(e, t), !0 !== t.nocheck && !0 !== t.chkDisabled ? (h.nodeChecked(e, t, n), a || (t.check_Child_State = i && 0 < i.length ? n ? 2 : 0 : -1)) : t.check_Child_State = -1, p.setChkClass(e, r, t), e.check.autoCheckTrigger && t != o && !0 !== t.nocheck && !0 !== t.chkDisabled && e.treeObj.trigger(u.event.CHECK, [null, e.treeId, t]))
                                }
                            }
                        },
                        event: {},
                        data: {
                            getRadioCheckedList: function(e) {
                                for (var t = h.getRoot(e).radioCheckedList, n = 0, o = t.length; n < o; n++) h.getNodeCache(e, t[n].tId) || (t.splice(n, 1), n--, o--);
                                return t
                            },
                            getCheckStatus: function(e, t) {
                                if (!e.check.enable || t.nocheck || t.chkDisabled) return null;
                                var n = h.nodeChecked(e, t);
                                return {
                                    checked: n,
                                    half: t.halfCheck ? t.halfCheck: e.check.chkStyle == u.radio.STYLE ? 2 === t.check_Child_State: n ? -1 < t.check_Child_State && t.check_Child_State < 2 : 0 < t.check_Child_State
                                }
                            },
                            getTreeCheckedNodes: function(e, t, n, o) {
                                if (!t) return [];
                                for (var r = n && e.check.chkStyle == u.radio.STYLE && e.check.radioType == u.radio.TYPE_ALL,
                                         a = (o = o || [], 0), i = t.length; a < i; a++) {
                                    var d = t[a],
                                        l = h.nodeChildren(e, d),
                                        s = h.nodeChecked(e, d);
                                    if (!0 !== d.nocheck && !0 !== d.chkDisabled && s == n && (o.push(d), r)) break;
                                    if (h.getTreeCheckedNodes(e, l, n, o), r && 0 < o.length) break
                                }
                                return o
                            },
                            getTreeChangeCheckedNodes: function(e, t, n) {
                                if (!t) return [];
                                n = n || [];
                                for (var o = 0,
                                         r = t.length; o < r; o++) {
                                    var a = t[o],
                                        i = h.nodeChildren(e, a),
                                        d = h.nodeChecked(e, a); ! 0 !== a.nocheck && !0 !== a.chkDisabled && d != a.checkedOld && n.push(a),
                                        h.getTreeChangeCheckedNodes(e, i, n)
                                }
                                return n
                            },
                            makeChkFlag: function(e, t) {
                                if (t) {
                                    var n = -1,
                                        o = h.nodeChildren(e, t);
                                    if (o) for (var r = 0,
                                                    a = o.length; r < a; r++) {
                                        var i = o[r],
                                            d = h.nodeChecked(e, i),
                                            l = -1;
                                        if (e.check.chkStyle == u.radio.STYLE) {
                                            if (2 == (l = !0 === i.nocheck || !0 === i.chkDisabled ? i.check_Child_State: !0 === i.halfCheck ? 2 : d ? 2 : 0 < i.check_Child_State ? 2 : 0)) {
                                                n = 2;
                                                break
                                            }
                                            0 == l && (n = 0)
                                        } else if (e.check.chkStyle == u.checkbox.STYLE) {
                                            if (1 === (l = !0 === i.nocheck || !0 === i.chkDisabled ? i.check_Child_State: !0 === i.halfCheck ? 1 : d ? -1 === i.check_Child_State || 2 === i.check_Child_State ? 2 : 1 : 0 < i.check_Child_State ? 1 : 0)) {
                                                n = 1;
                                                break
                                            }
                                            if (2 === l && -1 < n && 0 < r && l !== n) {
                                                n = 1;
                                                break
                                            }
                                            if (2 === n && -1 < l && l < 2) {
                                                n = 1;
                                                break
                                            } - 1 < l && (n = l)
                                        }
                                    }
                                    t.check_Child_State = n
                                }
                            }
                        }
                    });
                var c = (e = e.fn.zTree)._z.tools,
                    u = e.consts,
                    p = e._z.view,
                    h = e._z.data,
                    g = c.$;
                h.nodeChecked = function(e, t, n) {
                    return !! t && (e = e.data.key.checked, void 0 !== n && ("string" == typeof n && (n = c.eqs(n, "true")), t[e] = !!n), t[e])
                },
                    h.exSetting(n),
                    h.addInitBind(function(r) {
                        r.treeObj.bind(u.event.CHECK,
                            function(e, t, n, o) {
                                e.srcEvent = t,
                                    c.apply(r.callback.onCheck, [e, n, o])
                            })
                    }),
                    h.addInitUnBind(function(e) {
                        e.treeObj.unbind(u.event.CHECK)
                    }),
                    h.addInitCache(function() {}),
                    h.addInitNode(function(e, t, n, o) {
                        n && (t = h.nodeChecked(e, n), t = h.nodeChecked(e, n, t), n.checkedOld = t, "string" == typeof n.nocheck && (n.nocheck = c.eqs(n.nocheck, "true")), n.nocheck = !!n.nocheck || e.check.nocheckInherit && o && !!o.nocheck, "string" == typeof n.chkDisabled && (n.chkDisabled = c.eqs(n.chkDisabled, "true")), n.chkDisabled = !!n.chkDisabled || e.check.chkDisabledInherit && o && !!o.chkDisabled, "string" == typeof n.halfCheck && (n.halfCheck = c.eqs(n.halfCheck, "true")), n.halfCheck = !!n.halfCheck, n.check_Child_State = -1, n.check_Focus = !1, n.getCheckStatus = function() {
                            return h.getCheckStatus(e, n)
                        },
                        e.check.chkStyle == u.radio.STYLE && e.check.radioType == u.radio.TYPE_ALL && t && h.getRoot(e).radioCheckedList.push(n))
                    }),
                    h.addInitProxy(function(e) {
                            var t = e.target,
                                n = h.getSetting(e.data.treeId),
                                o = "",
                                r = null,
                                a = "",
                                i = null;
                            if (c.eqs(e.type, "mouseover") ? n.check.enable && c.eqs(t.tagName, "span") && null !== t.getAttribute("treeNode" + u.id.CHECK) && (o = c.getNodeMainDom(t).id, a = "mouseoverCheck") : c.eqs(e.type, "mouseout") ? n.check.enable && c.eqs(t.tagName, "span") && null !== t.getAttribute("treeNode" + u.id.CHECK) && (o = c.getNodeMainDom(t).id, a = "mouseoutCheck") : c.eqs(e.type, "click") && n.check.enable && c.eqs(t.tagName, "span") && null !== t.getAttribute("treeNode" + u.id.CHECK) && (o = c.getNodeMainDom(t).id, a = "checkNode"), 0 < o.length) switch (r = h.getNodeCache(n, o), a) {
                                case "checkNode":
                                    i = d;
                                    break;
                                case "mouseoverCheck":
                                    i = l;
                                    break;
                                case "mouseoutCheck":
                                    i = s
                            }
                            return {
                                stop: "checkNode" === a,
                                node: r,
                                nodeEventType: a,
                                nodeEventCallback: i,
                                treeEventType: "",
                                treeEventCallback: null
                            }
                        },
                        !0),
                    h.addInitRoot(function(e) {
                        h.getRoot(e).radioCheckedList = []
                    }),
                    h.addBeforeA(function(e, t, n) {
                        e.check.enable && (h.makeChkFlag(e, t), n.push("<span ID='", t.tId, u.id.CHECK, "' class='", p.makeChkClass(e, t), "' treeNode", u.id.CHECK, !0 === t.nocheck ? " style='display:none;'": "", "></span>"))
                    }),
                    h.addZTreeTools(function(a, o) {
                        o.checkNode = function(e, t, n, o) {
                            var r = h.nodeChecked(a, e); ! 0 === e.chkDisabled || (!0 !== t && !1 !== t && (t = !r), o = !!o, r === t && !n || o && 0 == c.apply(this.setting.callback.beforeCheck, [this.setting.treeId, e], !0) || !c.uCanDo(this.setting) || !this.setting.check.enable || !0 === e.nocheck) || (h.nodeChecked(a, e, t), t = g(e, u.id.CHECK, this.setting), (n || this.setting.check.chkStyle === u.radio.STYLE) && p.checkNodeRelation(this.setting, e), p.setChkClass(this.setting, t, e), p.repairParentChkClassWithSelf(this.setting, e), o && this.setting.treeObj.trigger(u.event.CHECK, [null, this.setting.treeId, e]))
                        },
                            o.checkAllNodes = function(e) {
                                p.repairAllChk(this.setting, !!e)
                            },
                            o.getCheckedNodes = function(e) {
                                e = !1 !== e;
                                var t = h.nodeChildren(a, h.getRoot(this.setting));
                                return h.getTreeCheckedNodes(this.setting, t, e)
                            },
                            o.getChangeCheckedNodes = function() {
                                var e = h.nodeChildren(a, h.getRoot(this.setting));
                                return h.getTreeChangeCheckedNodes(this.setting, e)
                            },
                            o.setChkDisabled = function(e, t, n, o) {
                                t = !!t,
                                    n = !!n,
                                    p.repairSonChkDisabled(this.setting, e, t, !!o),
                                    p.repairParentChkDisabled(this.setting, e.getParentNode(), t, n)
                            };
                        var r = o.updateNode;
                        o.updateNode = function(e, t) {
                            if (r && r.apply(o, arguments), e && this.setting.check.enable && g(e, this.setting).get(0) && c.uCanDo(this.setting)) {
                                var n = g(e, u.id.CHECK, this.setting); (1 == t || this.setting.check.chkStyle === u.radio.STYLE) && p.checkNodeRelation(this.setting, e),
                                    p.setChkClass(this.setting, n, e),
                                    p.repairParentChkClassWithSelf(this.setting, e)
                            }
                        }
                    });
                var a = p.createNodes;
                p.createNodes = function(e, t, n, o, r) {
                    a && a.apply(p, arguments),
                    n && p.repairParentChkClassWithSelf(e, o)
                };
                var o = p.removeNode;
                p.removeNode = function(e, t) {
                    var n = t.getParentNode();
                    o && o.apply(p, arguments),
                    t && n && (p.repairChkClass(e, n), p.repairParentChkClass(e, n))
                };
                var f = p.appendNodes;
                p.appendNodes = function(e, t, n, o, r, a, i) {
                    var d = "";
                    return f && (d = f.apply(p, arguments)),
                    o && h.makeChkFlag(e, o),
                        d
                }
            } (jQuery),
            function(F) {
                var H = {
                        event: {
                            DRAG: "ztree_drag",
                            DROP: "ztree_drop",
                            RENAME: "ztree_rename",
                            DRAGMOVE: "ztree_dragmove"
                        },
                        id: {
                            EDIT: "_edit",
                            INPUT: "_input",
                            REMOVE: "_remove"
                        },
                        move: {
                            TYPE_INNER: "inner",
                            TYPE_PREV: "prev",
                            TYPE_NEXT: "next"
                        },
                        node: {
                            CURSELECTED_EDIT: "curSelectedNode_Edit",
                            TMPTARGET_TREE: "tmpTargetzTree",
                            TMPTARGET_NODE: "tmpTargetNode"
                        }
                    },
                    s = {
                        onHoverOverNode: function(e, t) {
                            var n = K.getSetting(e.data.treeId),
                                o = K.getRoot(n);
                            o.curHoverNode != t && s.onHoverOutNode(e),
                                o.curHoverNode = t,
                                Y.addHoverDom(n, t)
                        },
                        onHoverOutNode: function(e) {
                            e = K.getSetting(e.data.treeId);
                            var t = K.getRoot(e);
                            t.curHoverNode && !K.isSelectedNode(e, t.curHoverNode) && (Y.removeTreeDom(e, t.curHoverNode), t.curHoverNode = null)
                        },
                        onMousedownNode: function(e, t) {
                            function d(e) {
                                if (0 == k.dragFlag && Math.abs(z - e.clientX) < b.edit.drag.minMoveSize && Math.abs(A - e.clientY) < b.edit.drag.minMoveSize) return ! 0;
                                var t, n, o, r;
                                if (P.css("cursor", "pointer"), 0 == k.dragFlag) {
                                    if (0 == B.apply(b.callback.beforeDrag, [b.treeId, y], !0)) return C(e),
                                        !0;
                                    for (t = 0, n = y.length; t < n; t++) 0 == t && (k.dragNodeShowBefore = []),
                                        o = y[t],
                                        K.nodeIsParent(b, o) && o.open ? (Y.expandCollapseNode(b, o, !o.open), k.dragNodeShowBefore[o.tId] = !0) : k.dragNodeShowBefore[o.tId] = !1;
                                    k.dragFlag = 1,
                                        m.showHoverDom = !1,
                                        B.showIfameMask(b, !0),
                                        r = !0;
                                    var a = -1;
                                    if (1 < y.length) for (o = [], n = (c = y[t = 0].parentTId ? K.nodeChildren(b, y[0].getParentNode()) : K.getNodes(b)).length; t < n; t++) if (void 0 !== k.dragNodeShowBefore[c[t].tId] && (r && -1 < a && a + 1 !== t && (r = !1), o.push(c[t]), a = t), y.length === o.length) {
                                        y = o;
                                        break
                                    }
                                    for (r && (x = y[0].getPreNode(), S = y[y.length - 1].getNextNode()), T = V("<ul class='zTreeDragUL'></ul>", b), t = 0, n = y.length; t < n; t++)(o = y[t]).editNameFlag = !1,
                                        Y.selectNode(b, o, 0 < t),
                                        Y.removeTreeDom(b, o),
                                    t > b.edit.drag.maxShowNodeNum - 1 || ((r = V("<li id='" + o.tId + "_tmp'></li>", b)).append(V(o, U.id.A, b).clone()), r.css("padding", "0"), r.children("#" + o.tId + U.id.A).removeClass(U.node.CURSELECTED), T.append(r), t == b.edit.drag.maxShowNodeNum - 1 && (r = V("<li id='" + o.tId + "_moretmp'><a>  ...  </a></li>", b), T.append(r)));
                                    T.attr("id", y[0].tId + U.id.UL + "_tmp"),
                                        T.addClass(b.treeObj.attr("class")),
                                        T.appendTo(P),
                                        (E = V("<span class='tmpzTreeMove_arrow'></span>", b)).attr("id", "zTreeMove_arrow_tmp"),
                                        E.appendTo(P),
                                        b.treeObj.trigger(U.event.DRAG, [e, b.treeId, y])
                                }
                                if (1 == k.dragFlag) {
                                    for (var i in I && E.attr("id") == e.target.id && R && e.clientX + _.scrollLeft() + 2 > F("#" + R + U.id.A, I).offset().left ? (o = F("#" + R + U.id.A, I), e.target = 0 < o.length ? o.get(0) : e.target) : I && (I.removeClass(U.node.TMPTARGET_TREE), R && F("#" + R + U.id.A, I).removeClass(U.node.TMPTARGET_NODE + "_" + U.move.TYPE_PREV).removeClass(U.node.TMPTARGET_NODE + "_" + H.move.TYPE_NEXT).removeClass(U.node.TMPTARGET_NODE + "_" + H.move.TYPE_INNER)), R = I = null, L = !1, O = b, o = K.getSettings()) o[i].treeId && o[i].edit.enable && o[i].treeId != b.treeId && (e.target.id == o[i].treeId || 0 < F(e.target).parents("#" + o[i].treeId).length) && (L = !0, O = o[i]);
                                    i = _.scrollTop(),
                                        r = _.scrollLeft(),
                                        a = O.treeObj.offset(),
                                        t = O.treeObj.get(0).scrollHeight,
                                        o = O.treeObj.get(0).scrollWidth,
                                        n = e.clientY + i - a.top;
                                    var d = O.treeObj.height() + a.top - e.clientY - i,
                                        l = e.clientX + r - a.left,
                                        s = O.treeObj.width() + a.left - e.clientX - r,
                                        c = (a = n < b.edit.drag.borderMax && n > b.edit.drag.borderMin, d < b.edit.drag.borderMax && d > b.edit.drag.borderMin),
                                        u = l < b.edit.drag.borderMax && l > b.edit.drag.borderMin,
                                        p = s < b.edit.drag.borderMax && s > b.edit.drag.borderMin,
                                        h = (d = n > b.edit.drag.borderMin && d > b.edit.drag.borderMin && l > b.edit.drag.borderMin && s > b.edit.drag.borderMin, l = a && O.treeObj.scrollTop() <= 0, s = c && O.treeObj.scrollTop() + O.treeObj.height() + 10 >= t, u && O.treeObj.scrollLeft() <= 0),
                                        g = p && O.treeObj.scrollLeft() + O.treeObj.width() + 10 >= o;
                                    if (e.target && B.isChildOrSelf(e.target, O.treeId)) {
                                        for (var f = e.target; f && f.tagName && !B.eqs(f.tagName, "li") && f.id != O.treeId;) f = f.parentNode;
                                        var N = !0;
                                        for (t = 0, n = y.length; t < n; t++) {
                                            if (o = y[t], f.id === o.tId) {
                                                N = !1;
                                                break
                                            }
                                            if (0 < V(o, b).find("#" + f.id).length) {
                                                N = !1;
                                                break
                                            }
                                        }
                                        N && e.target && B.isChildOrSelf(e.target, f.id + U.id.A) && (I = F(f), R = f.id)
                                    }
                                    if (o = y[0], d && B.isChildOrSelf(e.target, O.treeId) && (!I && (e.target.id == O.treeId || l || s || h || g) && (L || !L && o.parentTId) && (I = O.treeObj), a ? O.treeObj.scrollTop(O.treeObj.scrollTop() - 10) : c && O.treeObj.scrollTop(O.treeObj.scrollTop() + 10), u ? O.treeObj.scrollLeft(O.treeObj.scrollLeft() - 10) : p && O.treeObj.scrollLeft(O.treeObj.scrollLeft() + 10), I && I != O.treeObj && I.offset().left < O.treeObj.offset().left && O.treeObj.scrollLeft(O.treeObj.scrollLeft() + I.offset().left - O.treeObj.offset().left)), T.css({
                                        top: e.clientY + i + 3 + "px",
                                        left: e.clientX + r + 3 + "px"
                                    }), t = r = 0, I && I.attr("id") != O.treeId) {
                                        var v = null == R ? null: K.getNodeCache(O, R);
                                        a = (e.ctrlKey || e.metaKey) && b.edit.drag.isMove && b.edit.drag.isCopy || !b.edit.drag.isMove && b.edit.drag.isCopy;
                                        n = !(!x || R !== x.tId),
                                            u = !(!S || R !== S.tId),
                                            c = o.parentTId && o.parentTId == R,
                                            o = (a || !u) && B.apply(O.edit.drag.prev, [O.treeId, y, v], !!O.edit.drag.prev),
                                            n = (a || !n) && B.apply(O.edit.drag.next, [O.treeId, y, v], !!O.edit.drag.next),
                                            a = (a || !c) && !(O.data.keep.leaf && !K.nodeIsParent(b, v)) && B.apply(O.edit.drag.inner, [O.treeId, y, v], !!O.edit.drag.inner),
                                            c = function() {
                                                I = null,
                                                    R = "",
                                                    j = U.move.TYPE_INNER,
                                                    E.css({
                                                        display: "none"
                                                    }),
                                                window.zTreeMoveTimer && (clearTimeout(window.zTreeMoveTimer), window.zTreeMoveTargetNodeTId = null)
                                            },
                                            o || n || a ? (u = F("#" + R + U.id.A, I), p = v.isLastNode ? null: F("#" + v.getNextNode().tId + U.id.A, I.next()), d = u.offset().top, l = u.offset().left, s = o ? a ? .25 : n ? .5 : 1 : -1, h = n ? a ? .75 : o ? .5 : 0 : -1, i = (e.clientY + i - d) / u.height(), (1 == s || i <= s && -.2 <= i) && o ? (r = 1 - E.width(), t = d - E.height() / 2, j = U.move.TYPE_PREV) : (0 == h || h <= i && i <= 1.2) && n ? (r = 1 - E.width(), t = null == p || K.nodeIsParent(b, v) && v.open ? d + u.height() - E.height() / 2 : p.offset().top - E.height() / 2, j = U.move.TYPE_NEXT) : a ? (r = 5 - E.width(), t = d, j = U.move.TYPE_INNER) : c(), I && (E.css({
                                                display: "block",
                                                top: t + "px",
                                                left: l + r + "px"
                                            }), u.addClass(U.node.TMPTARGET_NODE + "_" + j), w == R && D == j || (M = (new Date).getTime()), v && K.nodeIsParent(b, v) && j == U.move.TYPE_INNER && (i = !0, window.zTreeMoveTimer && window.zTreeMoveTargetNodeTId !== v.tId ? (clearTimeout(window.zTreeMoveTimer), window.zTreeMoveTargetNodeTId = null) : window.zTreeMoveTimer && window.zTreeMoveTargetNodeTId === v.tId && (i = !1), i) && (window.zTreeMoveTimer = setTimeout(function() {
                                                    j == U.move.TYPE_INNER && v && K.nodeIsParent(b, v) && !v.open && (new Date).getTime() - M > O.edit.drag.autoOpenTime && B.apply(O.callback.beforeDragOpen, [O.treeId, v], !0) && (Y.switchNode(O, v), O.edit.drag.autoExpandTrigger && O.treeObj.trigger(U.event.EXPAND, [O.treeId, v]))
                                                },
                                                O.edit.drag.autoOpenTime + 50), window.zTreeMoveTargetNodeTId = v.tId))) : c()
                                    } else j = U.move.TYPE_INNER,
                                        I && B.apply(O.edit.drag.inner, [O.treeId, y, null], !!O.edit.drag.inner) ? I.addClass(U.node.TMPTARGET_TREE) : I = null,
                                        E.css({
                                            display: "none"
                                        }),
                                    window.zTreeMoveTimer && (clearTimeout(window.zTreeMoveTimer), window.zTreeMoveTargetNodeTId = null);
                                    w = R,
                                        D = j,
                                        b.treeObj.trigger(U.event.DRAGMOVE, [e, b.treeId, y])
                                }
                                return ! 1
                            }
                            function C(n) {
                                if (window.zTreeMoveTimer && (clearTimeout(window.zTreeMoveTimer), window.zTreeMoveTargetNodeTId = null), D = w = null, _.unbind("mousemove", d), _.unbind("mouseup", C), _.unbind("selectstart", l), P.css("cursor", ""), I && (I.removeClass(U.node.TMPTARGET_TREE), R && F("#" + R + U.id.A, I).removeClass(U.node.TMPTARGET_NODE + "_" + U.move.TYPE_PREV).removeClass(U.node.TMPTARGET_NODE + "_" + H.move.TYPE_NEXT).removeClass(U.node.TMPTARGET_NODE + "_" + H.move.TYPE_INNER)), B.showIfameMask(b, !1), m.showHoverDom = !0, 0 != k.dragFlag) {
                                    var e, t, o;
                                    for (e = k.dragFlag = 0, t = y.length; e < t; e++) o = y[e],
                                    K.nodeIsParent(b, o) && k.dragNodeShowBefore[o.tId] && !o.open && (Y.expandCollapseNode(b, o, !o.open), delete k.dragNodeShowBefore[o.tId]);
                                    T && T.remove(),
                                    E && E.remove();
                                    var r = (n.ctrlKey || n.metaKey) && b.edit.drag.isMove && b.edit.drag.isCopy || !b.edit.drag.isMove && b.edit.drag.isCopy;
                                    if (!r && I && R && y[0].parentTId && R == y[0].parentTId && j == U.move.TYPE_INNER && (I = null), I) {
                                        var a = null == R ? null: K.getNodeCache(O, R);
                                        if (0 == B.apply(b.callback.beforeDrop, [O.treeId, y, a, j, r], !0)) Y.selectNodes(s, y);
                                        else {
                                            var i = r ? B.clone(y) : y;
                                            e = function() {
                                                if (L) {
                                                    if (!r) for (var e = 0,
                                                                     t = y.length; e < t; e++) Y.removeNode(b, y[e]);
                                                    j == U.move.TYPE_INNER ? Y.addNodes(O, a, -1, i) : Y.addNodes(O, a.getParentNode(), j == U.move.TYPE_PREV ? a.getIndex() : a.getIndex() + 1, i)
                                                } else if (r && j == U.move.TYPE_INNER) Y.addNodes(O, a, -1, i);
                                                else if (r) Y.addNodes(O, a.getParentNode(), j == U.move.TYPE_PREV ? a.getIndex() : a.getIndex() + 1, i);
                                                else if (j != U.move.TYPE_NEXT) for (e = 0, t = i.length; e < t; e++) Y.moveNode(O, a, i[e], j, !1);
                                                else for (e = -1, t = i.length - 1; e < t; t--) Y.moveNode(O, a, i[t], j, !1);
                                                Y.selectNodes(O, i),
                                                    e = V(i[0], b).get(0),
                                                    Y.scrollIntoView(b, e),
                                                    b.treeObj.trigger(U.event.DROP, [n, O.treeId, i, a, j, r])
                                            },
                                                j == U.move.TYPE_INNER && B.canAsync(O, a) ? Y.asyncNode(O, a, !1, e) : e()
                                        }
                                    } else Y.selectNodes(s, y),
                                        b.treeObj.trigger(U.event.DROP, [n, b.treeId, y, null, null, null])
                                }
                            }
                            function l() {
                                return ! 1
                            }
                            var n, o, b = K.getSetting(e.data.treeId),
                                k = K.getRoot(b),
                                m = K.getRoots();
                            if (2 == e.button || !b.edit.enable || !b.edit.drag.isCopy && !b.edit.drag.isMove) return ! 0;
                            var r = e.target,
                                a = K.getRoot(b).curSelectedList,
                                y = [];
                            if (K.isSelectedNode(b, t)) for (n = 0, o = a.length; n < o; n++) {
                                if (a[n].editNameFlag && B.eqs(r.tagName, "input") && null !== r.getAttribute("treeNode" + U.id.INPUT)) return ! 0;
                                if (y.push(a[n]), y[0].parentTId !== a[n].parentTId) {
                                    y = [t];
                                    break
                                }
                            } else y = [t];
                            Y.editNodeBlur = !0,
                                Y.cancelCurEditNode(b);
                            var T, E, I, x, S, _ = F(b.treeObj.get(0).ownerDocument),
                                P = F(b.treeObj.get(0).ownerDocument.body),
                                L = !1,
                                O = b,
                                s = b,
                                w = null,
                                D = null,
                                R = null,
                                j = U.move.TYPE_INNER,
                                z = e.clientX,
                                A = e.clientY,
                                M = (new Date).getTime();
                            return B.uCanDo(b) && _.bind("mousemove", d),
                                _.bind("mouseup", C),
                                _.bind("selectstart", l),
                                !0
                        }
                    };
                F.extend(!0, F.fn.zTree.consts, H),
                    F.extend(!0, F.fn.zTree._z, {
                        tools: {
                            getAbs: function(e) {
                                return [(e = e.getBoundingClientRect()).left + (document.body.scrollLeft + document.documentElement.scrollLeft), e.top + (document.body.scrollTop + document.documentElement.scrollTop)]
                            },
                            inputFocus: function(e) {
                                e.get(0) && (e.focus(), B.setCursorPosition(e.get(0), e.val().length))
                            },
                            inputSelect: function(e) {
                                e.get(0) && (e.focus(), e.select())
                            },
                            setCursorPosition: function(e, t) {
                                if (e.setSelectionRange) e.focus(),
                                    e.setSelectionRange(t, t);
                                else if (e.createTextRange) {
                                    var n = e.createTextRange();
                                    n.collapse(!0),
                                        n.moveEnd("character", t),
                                        n.moveStart("character", t),
                                        n.select()
                                }
                            },
                            showIfameMask: function(e, t) {
                                for (var n = K.getRoot(e); 0 < n.dragMaskList.length;) n.dragMaskList[0].remove(),
                                    n.dragMaskList.shift();
                                if (t) for (var o = V("iframe", e), r = 0, a = o.length; r < a; r++) {
                                    var i = o.get(r),
                                        d = B.getAbs(i); (i = V("<div id='zTreeMask_" + r + "' class='zTreeMask' style='top:" + d[1] + "px; left:" + d[0] + "px; width:" + i.offsetWidth + "px; height:" + i.offsetHeight + "px;'></div>", e)).appendTo(V("body", e)),
                                        n.dragMaskList.push(i)
                                }
                            }
                        },
                        view: {
                            addEditBtn: function(e, t) {
                                if (! (t.editNameFlag || 0 < V(t, U.id.EDIT, e).length) && B.apply(e.edit.showRenameBtn, [e.treeId, t], e.edit.showRenameBtn)) {
                                    var n = V(t, U.id.A, e),
                                        o = "<span class='" + U.className.BUTTON + " edit' id='" + t.tId + U.id.EDIT + "' title='" + B.apply(e.edit.renameTitle, [e.treeId, t], e.edit.renameTitle) + "' treeNode" + U.id.EDIT + " style='display:none;'></span>";
                                    n.append(o),
                                        V(t, U.id.EDIT, e).bind("click",
                                            function() {
                                                return B.uCanDo(e) && 0 != B.apply(e.callback.beforeEditName, [e.treeId, t], !0) && Y.editNode(e, t),
                                                    !1
                                            }).show()
                                }
                            },
                            addRemoveBtn: function(e, t) {
                                if (! (t.editNameFlag || 0 < V(t, U.id.REMOVE, e).length) && B.apply(e.edit.showRemoveBtn, [e.treeId, t], e.edit.showRemoveBtn)) {
                                    var n = V(t, U.id.A, e),
                                        o = "<span class='" + U.className.BUTTON + " remove' id='" + t.tId + U.id.REMOVE + "' title='" + B.apply(e.edit.removeTitle, [e.treeId, t], e.edit.removeTitle) + "' treeNode" + U.id.REMOVE + " style='display:none;'></span>";
                                    n.append(o),
                                        V(t, U.id.REMOVE, e).bind("click",
                                            function() {
                                                return B.uCanDo(e) && 0 != B.apply(e.callback.beforeRemove, [e.treeId, t], !0) && (Y.removeNode(e, t), e.treeObj.trigger(U.event.REMOVE, [e.treeId, t])),
                                                    !1
                                            }).bind("mousedown",
                                            function() {
                                                return ! 0
                                            }).show()
                                }
                            },
                            addHoverDom: function(e, t) {
                                K.getRoots().showHoverDom && (t.isHover = !0, e.edit.enable && (Y.addEditBtn(e, t), Y.addRemoveBtn(e, t)), B.apply(e.view.addHoverDom, [e.treeId, t]))
                            },
                            cancelCurEditNode: function(e, t, n) {
                                var o = K.getRoot(e),
                                    r = o.curEditNode;
                                if (r) {
                                    var a = o.curEditInput;
                                    t = t || (n ? K.nodeName(e, r) : a.val());
                                    if (!1 === B.apply(e.callback.beforeRename, [e.treeId, r, t, n], !0)) return ! 1;
                                    K.nodeName(e, r, t),
                                        V(r, U.id.A, e).removeClass(U.node.CURSELECTED_EDIT),
                                        a.unbind(),
                                        Y.setNodeName(e, r),
                                        r.editNameFlag = !1,
                                        o.curEditNode = null,
                                        o.curEditInput = null,
                                        Y.selectNode(e, r, !1),
                                        e.treeObj.trigger(U.event.RENAME, [e.treeId, r, n])
                                }
                                return o.noSelection = !0
                            },
                            editNode: function(t, e) {
                                var n = K.getRoot(t);
                                if (Y.editNodeBlur = !1, K.isSelectedNode(t, e) && n.curEditNode == e && e.editNameFlag) setTimeout(function() {
                                        B.inputFocus(n.curEditInput)
                                    },
                                    0);
                                else {
                                    e.editNameFlag = !0,
                                        Y.removeTreeDom(t, e),
                                        Y.cancelCurEditNode(t),
                                        Y.selectNode(t, e, !1),
                                        V(e, U.id.SPAN, t).html("<input type=text class='rename' id='" + e.tId + U.id.INPUT + "' treeNode" + U.id.INPUT + " >");
                                    var o = V(e, U.id.INPUT, t);
                                    o.attr("value", K.nodeName(t, e)),
                                        t.edit.editNameSelectAll ? B.inputSelect(o) : B.inputFocus(o),
                                        o.bind("blur",
                                            function() {
                                                Y.editNodeBlur || Y.cancelCurEditNode(t)
                                            }).bind("keydown",
                                            function(e) {
                                                "13" == e.keyCode ? (Y.editNodeBlur = !0, Y.cancelCurEditNode(t)) : "27" == e.keyCode && Y.cancelCurEditNode(t, null, !0)
                                            }).bind("click",
                                            function() {
                                                return ! 1
                                            }).bind("dblclick",
                                            function() {
                                                return ! 1
                                            }),
                                        V(e, U.id.A, t).addClass(U.node.CURSELECTED_EDIT),
                                        n.curEditInput = o,
                                        n.noSelection = !1,
                                        n.curEditNode = e
                                }
                            },
                            moveNode: function(e, t, n, o, r, a) {
                                var i = K.getRoot(e);
                                if (t != n && (!e.data.keep.leaf || !t || K.nodeIsParent(e, t) || o != U.move.TYPE_INNER)) {
                                    var d, l, s = n.parentTId ? n.getParentNode() : i; (p = null === t || t == i) && null === t && (t = i),
                                    p && (o = U.move.TYPE_INNER),
                                        i = t.parentTId ? t.getParentNode() : i,
                                    o != U.move.TYPE_PREV && o != U.move.TYPE_NEXT && (o = U.move.TYPE_INNER),
                                    o == U.move.TYPE_INNER && (p ? n.parentTId = null: (K.nodeIsParent(e, t) || (K.nodeIsParent(e, t, !0), t.open = !!t.open, Y.setNodeLineIcos(e, t)), n.parentTId = t.tId)),
                                        p ? d = p = e.treeObj: (a || o != U.move.TYPE_INNER ? a || Y.expandCollapseNode(e, t.getParentNode(), !0, !1) : Y.expandCollapseNode(e, t, !0, !1), p = V(t, e), d = V(t, U.id.UL, e), p.get(0) && !d.get(0) && (d = [], Y.makeUlHtml(e, t, d, ""), p.append(d.join(""))), d = V(t, U.id.UL, e)),
                                        (c = V(n, e)).get(0) ? p.get(0) || c.remove() : c = Y.appendNodes(e, n.level, [n], null, -1, !1, !0).join(""),
                                        d.get(0) && o == U.move.TYPE_INNER ? d.append(c) : p.get(0) && o == U.move.TYPE_PREV ? p.before(c) : p.get(0) && o == U.move.TYPE_NEXT && p.after(c),
                                        d = -1;
                                    var c = 0,
                                        u = null,
                                        p = null,
                                        h = n.level,
                                        g = K.nodeChildren(e, s),
                                        f = K.nodeChildren(e, i),
                                        N = K.nodeChildren(e, t);
                                    if (n.isFirstNode) d = 0,
                                    1 < g.length && ((u = g[1]).isFirstNode = !0);
                                    else if (n.isLastNode)(u = g[(d = g.length - 1) - 1]).isLastNode = !0;
                                    else for (i = 0, l = g.length; i < l; i++) if (g[i].tId == n.tId) {
                                            d = i;
                                            break
                                        }
                                    if (0 <= d && g.splice(d, 1), o != U.move.TYPE_INNER) for (i = 0, l = f.length; i < l; i++) f[i].tId == t.tId && (c = i);
                                    o == U.move.TYPE_INNER ? (N || (N = K.nodeChildren(e, t, [])), 0 < N.length && ((p = N[N.length - 1]).isLastNode = !1), N.splice(N.length, 0, n), n.isLastNode = !0, n.isFirstNode = 1 == N.length) : t.isFirstNode && o == U.move.TYPE_PREV ? (f.splice(c, 0, n), (p = t).isFirstNode = !1, n.parentTId = t.parentTId, n.isFirstNode = !0, n.isLastNode = !1) : t.isLastNode && o == U.move.TYPE_NEXT ? (f.splice(c + 1, 0, n), (p = t).isLastNode = !1, n.parentTId = t.parentTId, n.isFirstNode = !1, n.isLastNode = !0) : (o == U.move.TYPE_PREV ? f.splice(c, 0, n) : f.splice(c + 1, 0, n), n.parentTId = t.parentTId, n.isFirstNode = !1, n.isLastNode = !1),
                                        K.fixPIdKeyValue(e, n),
                                        K.setSonNodeLevel(e, n.getParentNode(), n),
                                        Y.setNodeLineIcos(e, n),
                                        Y.repairNodeLevelClass(e, n, h),
                                        !e.data.keep.parent && g.length < 1 ? (K.nodeIsParent(e, s, !1), s.open = !1, t = V(s, U.id.UL, e), o = V(s, U.id.SWITCH, e), i = V(s, U.id.ICON, e), Y.replaceSwitchClass(s, o, U.folder.DOCU), Y.replaceIcoClass(s, i, U.folder.DOCU), t.css("display", "none")) : u && Y.setNodeLineIcos(e, u),
                                    p && Y.setNodeLineIcos(e, p),
                                    e.check && e.check.enable && Y.repairChkClass && (Y.repairChkClass(e, s), Y.repairParentChkClassWithSelf(e, s), s != n.parent && Y.repairParentChkClassWithSelf(e, n)),
                                    a || Y.expandCollapseParentNode(e, n.getParentNode(), !0, r)
                                }
                            },
                            removeEditBtn: function(e, t) {
                                V(t, U.id.EDIT, e).unbind().remove()
                            },
                            removeRemoveBtn: function(e, t) {
                                V(t, U.id.REMOVE, e).unbind().remove()
                            },
                            removeTreeDom: function(e, t) {
                                t.isHover = !1,
                                    Y.removeEditBtn(e, t),
                                    Y.removeRemoveBtn(e, t),
                                    B.apply(e.view.removeHoverDom, [e.treeId, t])
                            },
                            repairNodeLevelClass: function(e, t, n) {
                                if (n !== t.level) {
                                    var o = V(t, e),
                                        r = V(t, U.id.A, e);
                                    e = V(t, U.id.UL, e),
                                        n = U.className.LEVEL + n,
                                        t = U.className.LEVEL + t.level;
                                    o.removeClass(n),
                                        o.addClass(t),
                                        r.removeClass(n),
                                        r.addClass(t),
                                        e.removeClass(n),
                                        e.addClass(t)
                                }
                            },
                            selectNodes: function(e, t) {
                                for (var n = 0,
                                         o = t.length; n < o; n++) Y.selectNode(e, t[n], 0 < n)
                            }
                        },
                        event: {},
                        data: {
                            setSonNodeLevel: function(e, t, n) {
                                if (n) {
                                    var o = K.nodeChildren(e, n);
                                    if (n.level = t ? t.level + 1 : 0, o) {
                                        t = 0;
                                        for (var r = o.length; t < r; t++) o[t] && K.setSonNodeLevel(e, n, o[t])
                                    }
                                }
                            }
                        }
                    });
                var e = F.fn.zTree,
                    B = e._z.tools,
                    U = e.consts,
                    Y = e._z.view,
                    K = e._z.data,
                    V = B.$;
                K.exSetting({
                    edit: {
                        enable: !1,
                        editNameSelectAll: !1,
                        showRemoveBtn: !0,
                        showRenameBtn: !0,
                        removeTitle: "remove",
                        renameTitle: "rename",
                        drag: {
                            autoExpandTrigger: !1,
                            isCopy: !0,
                            isMove: !0,
                            prev: !0,
                            next: !0,
                            inner: !0,
                            minMoveSize: 5,
                            borderMax: 10,
                            borderMin: -5,
                            maxShowNodeNum: 5,
                            autoOpenTime: 500
                        }
                    },
                    view: {
                        addHoverDom: null,
                        removeHoverDom: null
                    },
                    callback: {
                        beforeDrag: null,
                        beforeDragOpen: null,
                        beforeDrop: null,
                        beforeEditName: null,
                        beforeRename: null,
                        onDrag: null,
                        onDragMove: null,
                        onDrop: null,
                        onRename: null
                    }
                }),
                    K.addInitBind(function(d) {
                        var e = d.treeObj,
                            t = U.event;
                        e.bind(t.RENAME,
                            function(e, t, n, o) {
                                B.apply(d.callback.onRename, [e, t, n, o])
                            }),
                            e.bind(t.DRAG,
                                function(e, t, n, o) {
                                    B.apply(d.callback.onDrag, [t, n, o])
                                }),
                            e.bind(t.DRAGMOVE,
                                function(e, t, n, o) {
                                    B.apply(d.callback.onDragMove, [t, n, o])
                                }),
                            e.bind(t.DROP,
                                function(e, t, n, o, r, a, i) {
                                    B.apply(d.callback.onDrop, [t, n, o, r, a, i])
                                })
                    }),
                    K.addInitUnBind(function(e) {
                        e = e.treeObj;
                        var t = U.event;
                        e.unbind(t.RENAME),
                            e.unbind(t.DRAG),
                            e.unbind(t.DRAGMOVE),
                            e.unbind(t.DROP)
                    }),
                    K.addInitCache(function() {}),
                    K.addInitNode(function(e, t, n) {
                        n && (n.isHover = !1, n.editNameFlag = !1)
                    }),
                    K.addInitProxy(function(e) {
                        var t = e.target,
                            n = K.getSetting(e.data.treeId),
                            o = e.relatedTarget,
                            r = "",
                            a = null,
                            i = "",
                            d = null,
                            l = null;
                        if (B.eqs(e.type, "mouseover") ? (l = B.getMDom(n, t, [{
                            tagName: "a",
                            attrName: "treeNode" + U.id.A
                        }])) && (r = B.getNodeMainDom(l).id, i = "hoverOverNode") : B.eqs(e.type, "mouseout") ? (l = B.getMDom(n, o, [{
                            tagName: "a",
                            attrName: "treeNode" + U.id.A
                        }])) || (r = "remove", i = "hoverOutNode") : B.eqs(e.type, "mousedown") && (l = B.getMDom(n, t, [{
                            tagName: "a",
                            attrName: "treeNode" + U.id.A
                        }])) && (r = B.getNodeMainDom(l).id, i = "mousedownNode"), 0 < r.length) switch (a = K.getNodeCache(n, r), i) {
                            case "mousedownNode":
                                d = s.onMousedownNode;
                                break;
                            case "hoverOverNode":
                                d = s.onHoverOverNode;
                                break;
                            case "hoverOutNode":
                                d = s.onHoverOutNode
                        }
                        return {
                            stop: !1,
                            node: a,
                            nodeEventType: i,
                            nodeEventCallback: d,
                            treeEventType: "",
                            treeEventCallback: null
                        }
                    }),
                    K.addInitRoot(function(e) {
                        e = K.getRoot(e);
                        var t = K.getRoots();
                        e.curEditNode = null,
                            e.curEditInput = null,
                            e.curHoverNode = null,
                            e.dragFlag = 0,
                            e.dragNodeShowBefore = [],
                            e.dragMaskList = [],
                            t.showHoverDom = !0
                    }),
                    K.addZTreeTools(function(d, e) {
                        e.cancelEditName = function(e) {
                            K.getRoot(this.setting).curEditNode && Y.cancelCurEditNode(this.setting, e || null, !0)
                        },
                            e.copyNode = function(e, t, n, o) {
                                if (!t) return null;
                                var r = K.nodeIsParent(d, e);
                                if (e && !r && this.setting.data.keep.leaf && n === U.move.TYPE_INNER) return null;
                                var a = this,
                                    i = B.clone(t);
                                return e || (e = null, n = U.move.TYPE_INNER),
                                    n == U.move.TYPE_INNER ? (t = function() {
                                        Y.addNodes(a.setting, e, -1, [i], o)
                                    },
                                        B.canAsync(this.setting, e) ? Y.asyncNode(this.setting, e, o, t) : t()) : (Y.addNodes(this.setting, e.parentNode, -1, [i], o), Y.moveNode(this.setting, e, i, n, !1, o)),
                                    i
                            },
                            e.editName = function(e) {
                                e && e.tId && e === K.getNodeCache(this.setting, e.tId) && (e.parentTId && Y.expandCollapseParentNode(this.setting, e.getParentNode(), !0), Y.editNode(this.setting, e))
                            },
                            e.moveNode = function(e, t, n, o) {
                                function r() {
                                    Y.moveNode(i.setting, e, t, n, !1, o)
                                }
                                if (!t) return t;
                                var a = K.nodeIsParent(d, e);
                                if (e && !a && this.setting.data.keep.leaf && n === U.move.TYPE_INNER) return null;
                                if (e && (t.parentTId == e.tId && n == U.move.TYPE_INNER || 0 < V(t, this.setting).find("#" + e.tId).length)) return null;
                                e || (e = null);
                                var i = this;
                                return B.canAsync(this.setting, e) && n === U.move.TYPE_INNER ? Y.asyncNode(this.setting, e, o, r) : r(),
                                    t
                            },
                            e.setEditable = function(e) {
                                return this.setting.edit.enable = e,
                                    this.refresh()
                            }
                    });
                var a = Y.cancelPreSelectedNode;
                Y.cancelPreSelectedNode = function(e, t) {
                    for (var n = K.getRoot(e).curSelectedList, o = 0, r = n.length; o < r && (t && t !== n[o] || (Y.removeTreeDom(e, n[o]), !t)); o++);
                    a && a.apply(Y, arguments)
                };
                var i = Y.createNodes;
                Y.createNodes = function(e, t, n, o, r) {
                    i && i.apply(Y, arguments),
                    n && Y.repairParentChkClassWithSelf && Y.repairParentChkClassWithSelf(e, o)
                };
                var n = Y.makeNodeUrl;
                Y.makeNodeUrl = function(e, t) {
                    return e.edit.enable ? null: n.apply(Y, arguments)
                };
                var o = Y.removeNode;
                Y.removeNode = function(e, t) {
                    var n = K.getRoot(e);
                    n.curEditNode === t && (n.curEditNode = null),
                    o && o.apply(Y, arguments)
                };
                var r = Y.selectNode;
                Y.selectNode = function(e, t, n) {
                    var o = K.getRoot(e);
                    return (!K.isSelectedNode(e, t) || o.curEditNode != t || !t.editNameFlag) && (r && r.apply(Y, arguments), Y.addHoverDom(e, t), !0)
                };
                var d = B.uCanDo;
                B.uCanDo = function(e, t) {
                    var n = K.getRoot(e);
                    return ! (!t || !(B.eqs(t.type, "mouseover") || B.eqs(t.type, "mouseout") || B.eqs(t.type, "mousedown") || B.eqs(t.type, "mouseup"))) || (n.curEditNode && (Y.editNodeBlur = !1, n.curEditInput.focus()), !n.curEditNode && (!d || d.apply(Y, arguments)))
                }
            } (jQuery),
            function(e) {
                e.extend(!0, e.fn.zTree._z, {
                    view: {
                        clearOldFirstNode: function(e, t) {
                            for (var n = t.getNextNode(); n;) {
                                if (n.isFirstNode) {
                                    n.isFirstNode = !1,
                                        s.setNodeLineIcos(e, n);
                                    break
                                }
                                if (n.isLastNode) break;
                                n = n.getNextNode()
                            }
                        },
                        clearOldLastNode: function(e, t, n) {
                            for (t = t.getPreNode(); t;) {
                                if (t.isLastNode) {
                                    t.isLastNode = !1,
                                    n && s.setNodeLineIcos(e, t);
                                    break
                                }
                                if (t.isFirstNode) break;
                                t = t.getPreNode()
                            }
                        },
                        makeDOMNodeMainBefore: function(e, t, n) {
                            t = c.isHidden(t, n),
                                e.push("<li ", t ? "style='display:none;' ": "", "id='", n.tId, "' class='", r.className.LEVEL, n.level, "' tabindex='0' hidefocus='true' treenode>")
                        },
                        showNode: function(e, t) {
                            c.isHidden(e, t, !1),
                                c.initShowForExCheck(e, t),
                                a(t, e).show()
                        },
                        showNodes: function(e, t, n) {
                            if (t && 0 != t.length) {
                                var o, r, a = {};
                                for (o = 0, r = t.length; o < r; o++) {
                                    var i = t[o];
                                    if (!a[i.parentTId]) {
                                        var d = i.getParentNode();
                                        a[i.parentTId] = null === d ? c.getRoot(e) : i.getParentNode()
                                    }
                                    s.showNode(e, i, n)
                                }
                                for (var l in a) t = c.nodeChildren(e, a[l]),
                                    s.setFirstNodeForShow(e, t),
                                    s.setLastNodeForShow(e, t)
                            }
                        },
                        hideNode: function(e, t) {
                            c.isHidden(e, t, !0),
                                t.isFirstNode = !1,
                                t.isLastNode = !1,
                                c.initHideForExCheck(e, t),
                                s.cancelPreSelectedNode(e, t),
                                a(t, e).hide()
                        },
                        hideNodes: function(e, t, n) {
                            if (t && 0 != t.length) {
                                var o, r, a = {};
                                for (o = 0, r = t.length; o < r; o++) {
                                    var i = t[o];
                                    if ((i.isFirstNode || i.isLastNode) && !a[i.parentTId]) {
                                        var d = i.getParentNode();
                                        a[i.parentTId] = null === d ? c.getRoot(e) : i.getParentNode()
                                    }
                                    s.hideNode(e, i, n)
                                }
                                for (var l in a) t = c.nodeChildren(e, a[l]),
                                    s.setFirstNodeForHide(e, t),
                                    s.setLastNodeForHide(e, t)
                            }
                        },
                        setFirstNode: function(e, t) {
                            var n = c.nodeChildren(e, t),
                                o = c.isHidden(e, n[0], !1);
                            0 < n.length && !o ? n[0].isFirstNode = !0 : 0 < n.length && s.setFirstNodeForHide(e, n)
                        },
                        setLastNode: function(e, t) {
                            var n = c.nodeChildren(e, t),
                                o = c.isHidden(e, n[0]);
                            0 < n.length && !o ? n[n.length - 1].isLastNode = !0 : 0 < n.length && s.setLastNodeForHide(e, n)
                        },
                        setFirstNodeForHide: function(e, t) {
                            var n, o, r;
                            for (o = 0, r = t.length; o < r && !(n = t[o]).isFirstNode; o++) {
                                if (!c.isHidden(e, n) && !n.isFirstNode) {
                                    n.isFirstNode = !0,
                                        s.setNodeLineIcos(e, n);
                                    break
                                }
                                n = null
                            }
                            return n
                        },
                        setFirstNodeForShow: function(e, t) {
                            var n, o, r, a, i;
                            for (o = 0, r = t.length; o < r; o++) {
                                n = t[o];
                                var d = c.isHidden(e, n);
                                if (!a && !d && n.isFirstNode) {
                                    a = n;
                                    break
                                }
                                if (a || d || n.isFirstNode) {
                                    if (a && n.isFirstNode) {
                                        n.isFirstNode = !1,
                                            i = n,
                                            s.setNodeLineIcos(e, n);
                                        break
                                    }
                                } else n.isFirstNode = !0,
                                    a = n,
                                    s.setNodeLineIcos(e, n)
                            }
                            return {
                                new: a,
                                old: i
                            }
                        },
                        setLastNodeForHide: function(e, t) {
                            var n, o;
                            for (o = t.length - 1; 0 <= o && !(n = t[o]).isLastNode; o--) {
                                if (!c.isHidden(e, n) && !n.isLastNode) {
                                    n.isLastNode = !0,
                                        s.setNodeLineIcos(e, n);
                                    break
                                }
                                n = null
                            }
                            return n
                        },
                        setLastNodeForShow: function(e, t) {
                            var n, o, r, a;
                            for (o = t.length - 1; 0 <= o; o--) {
                                n = t[o];
                                var i = c.isHidden(e, n);
                                if (!r && !i && n.isLastNode) {
                                    r = n;
                                    break
                                }
                                if (r || i || n.isLastNode) {
                                    if (r && n.isLastNode) {
                                        n.isLastNode = !1,
                                            a = n,
                                            s.setNodeLineIcos(e, n);
                                        break
                                    }
                                } else n.isLastNode = !0,
                                    r = n,
                                    s.setNodeLineIcos(e, n)
                            }
                            return {
                                new: r,
                                old: a
                            }
                        }
                    },
                    data: {
                        initHideForExCheck: function(e, t) {
                            c.isHidden(e, t) && e.check && e.check.enable && (void 0 === t._nocheck && (t._nocheck = !!t.nocheck, t.nocheck = !0), t.check_Child_State = -1, s.repairParentChkClassWithSelf && s.repairParentChkClassWithSelf(e, t))
                        },
                        initShowForExCheck: function(e, t) {
                            if (!c.isHidden(e, t) && e.check && e.check.enable) {
                                if (void 0 !== t._nocheck && (t.nocheck = t._nocheck, delete t._nocheck), s.setChkClass) {
                                    var n = a(t, r.id.CHECK, e);
                                    s.setChkClass(e, n, t)
                                }
                                s.repairParentChkClassWithSelf && s.repairParentChkClassWithSelf(e, t)
                            }
                        }
                    }
                });
                var o = (e = e.fn.zTree)._z.tools,
                    r = e.consts,
                    s = e._z.view,
                    c = e._z.data,
                    a = o.$;
                c.isHidden = function(e, t, n) {
                    return !! t && (e = e.data.key.isHidden, void 0 !== n && ("string" == typeof n && (n = o.eqs(checked, "true")), t[e] = !!n), t[e])
                },
                    c.exSetting({
                        data: {
                            key: {
                                isHidden: "isHidden"
                            }
                        }
                    }),
                    c.addInitNode(function(e, t, n) {
                        t = c.isHidden(e, n),
                            c.isHidden(e, n, t),
                            c.initHideForExCheck(e, n)
                    }),
                    c.addBeforeA(function() {}),
                    c.addZTreeTools(function(r, a) {
                        a.showNodes = function(e, t) {
                            s.showNodes(r, e, t)
                        },
                            a.showNode = function(e, t) {
                                e && s.showNodes(r, [e], t)
                            },
                            a.hideNodes = function(e, t) {
                                s.hideNodes(r, e, t)
                            },
                            a.hideNode = function(e, t) {
                                e && s.hideNodes(r, [e], t)
                            };
                        var i = a.checkNode;
                        i && (a.checkNode = function(e, t, n, o) { (!e || !c.isHidden(r, e)) && i.apply(a, arguments)
                        })
                    });
                var l = c.initNode;
                c.initNode = function(e, t, n, o, r, a, i) {
                    var d = (o || c.getRoot(e))[e.data.key.children];
                    c.tmpHideFirstNode = s.setFirstNodeForHide(e, d),
                        c.tmpHideLastNode = s.setLastNodeForHide(e, d),
                    i && (s.setNodeLineIcos(e, c.tmpHideFirstNode), s.setNodeLineIcos(e, c.tmpHideLastNode)),
                        c.tmpHideFirstNode,
                        a = c.tmpHideLastNode === n,
                    l && l.apply(c, arguments),
                    i && a && s.clearOldLastNode(e, n, i)
                };
                var n = c.makeChkFlag;
                n && (c.makeChkFlag = function(e, t) { (!t || !c.isHidden(e, t)) && n.apply(c, arguments)
                });
                var i = c.getTreeCheckedNodes;
                i && (c.getTreeCheckedNodes = function(e, t, n, o) {
                    if (t && 0 < t.length) {
                        var r = t[0].getParentNode();
                        if (r && c.isHidden(e, r)) return []
                    }
                    return i.apply(c, arguments)
                });
                var d = c.getTreeChangeCheckedNodes;
                d && (c.getTreeChangeCheckedNodes = function(e, t, n) {
                    if (t && 0 < t.length) {
                        var o = t[0].getParentNode();
                        if (o && c.isHidden(e, o)) return []
                    }
                    return d.apply(c, arguments)
                });
                var u = s.expandCollapseSonNode;
                u && (s.expandCollapseSonNode = function(e, t, n, o, r) { (!t || !c.isHidden(e, t)) && u.apply(s, arguments)
                });
                var p = s.setSonNodeCheckBox;
                p && (s.setSonNodeCheckBox = function(e, t, n, o) { (!t || !c.isHidden(e, t)) && p.apply(s, arguments)
                });
                var h = s.repairParentChkClassWithSelf;
                h && (s.repairParentChkClassWithSelf = function(e, t) { (!t || !c.isHidden(e, t)) && h.apply(s, arguments)
                })
            } (jQuery),
            TreeSelect.prototype.render = function(e) {
                var a = e.elem,
                    t = e.data,
                    n = void 0 === e.type ? "GET": e.type,
                    i = e.click,
                    o = e.success,
                    r = void 0 === e.placeholder ? "请选择": e.placeholder,
                    d = void 0 !== e.search && e.search,
                    l = e.style,
                    s = (new Date).getTime(),
                    c = {},
                    u = "layui-form-selected",
                    p = void 0,
                    h = "treeSelect-input-" + s,
                    g = "layui-treeSelect-" + s,
                    f = "layui-select-title-" + s,
                    N = "layui-treeSelect-body-" + s,
                    v = "layui-treeSelect-search-ed",
                    he = e.headers,
                    C = {
                        init: function() {
                            return $.ajax({
                                url: t,
                                type: n,
                                headers:he,
                                dataType: "json",
                                success: function(e) { (c = e, C.hideElem().input().toggleSelect().loadCss().preventEvent(), $.fn.zTree.init($("#" + N), C.setting(), e), p = $.fn.zTree.getZTreeObj(N), d && C.searchParam(), C.configStyle(), o) && o({
                                    treeId: g,
                                    data: e
                                })
                                }
                            }),
                                C
                        },
                        checkDefaultValue: function() {},
                        setting: function() {
                            return {
                                callback: {
                                    onClick: C.onClick,
                                    onExpand: C.onExpand,
                                    onCollapse: C.onCollapse,
                                    beforeExpand: C.ztreeCallBack.beforeExpand
                                }
                            }
                        },
                        ztreeCallBack: {
                            beforeExpand: function() {
                                C.configStyle()
                            }
                        },
                        onCollapse: function() {
                            C.focusInput()
                        },
                        onExpand: function() {
                            C.configStyle(),
                                C.focusInput()
                        },
                        focusInput: function() {
                            $("#" + h).focus()
                        },
                        onClick: function(e, t, n) {
                            var o = n.name,
                                r = n.id; ($("#" + f + " input").val(o), $(a).attr("value", r).val(r), $("#" + g).removeClass(u), i) && i({
                                data: c,
                                current: n,
                                treeId: g
                            });
                            return C
                        },
                        hideElem: function() {
                            return $(a).hide(),
                                C
                        },
                        input: function() {
                            var e = "";
                            d || (e = "readonly");
                            var t = '<div class="layui-treeSelect layui-unselect layui-form-select" id="' + g + '"><div class="layui-select-title" id="' + f + '"> <input type="text" id="' + h + '" placeholder="' + r + '" value="" ' + e + ' class="layui-input layui-unselect"><i class="layui-edge"></i></div><div class="layui-anim layui-anim-upbit" style=""><div class="layui-treeSelect-body ztree" id="' + N + '"></div></div></div>';
                            return $(a).parent().append(t),
                                C
                        },
                        toggleSelect: function() {
                            var e = "#" + f;
                            return C.event("click", e,
                                function(e) {
                                    var t = $("#" + g);
                                    t.hasClass(u) ? (t.removeClass(u), $("#" + h).blur()) : ($(".layui-form-select").removeClass(u), t.addClass(u)),
                                        e.stopPropagation()
                                }),
                                $(document).click(function() {
                                    var e = $("#" + g);
                                    e.hasClass(u) && (e.removeClass(u), $("#" + h).blur())
                                }),
                                C
                        },
                        searchParam: function() {
                            if (d) {
                                var e = "#" + h;
                                C.fuzzySearch(e, null, !0)
                            }
                        },
                        fuzzySearch: function(t, e, o) {
                            var r = p;
                            r || alert("fail to get ztree object");
                            var a = r.setting.data.key.name;
                            e = !1 !== e,
                                o = !!o,
                                r.setting.view.nameIsHTML = e;
                            new RegExp("[\\[\\]\\\\^\\$\\.\\|\\?\\*\\+\\(\\)]", "gi");
                            function n(t, n, e) {
                                n || (n = ""),
                                    function(e, t) {
                                        if (e && 0 < e.length) if (0 < t.length) $.each(e,
                                            function(e, t) {
                                                var n = t.getPath();
                                                if (n && 0 < n.length) for (var o = 0; o < n.length - 1; o++) r.showNode(n[o]),
                                                    r.expandNode(n[o], !0)
                                            });
                                        else {
                                            var n = r.getNodesByParam("level", "0");
                                            $.each(n,
                                                function(e, t) {
                                                    r.expandNode(t, !0)
                                                })
                                        }
                                    } (t.getNodesByFilter(function(e) {
                                        return e && e.oldname && 0 < e.oldname.length && (e[a] = e.oldname),
                                            t.updateNode(e),
                                            0 == n.length ? (t.showNode(e), t.expandNode(e, o), !0) : e[a] && -1 != e[a].toLowerCase().indexOf(n.toLowerCase()) ? (t.showNode(e), !0) : (t.hideNode(e), !1)
                                    }), n)
                            }
                            $(t).bind("input propertychange",
                                function() { !
                                    function(e) {
                                        i && clearTimeout(i);
                                        i = setTimeout(function() {
                                                n(r, e),
                                                    $(t).focus()
                                            },
                                            500)
                                    } ($(this).val())
                                });
                            var i = null
                        },
                        checkNodes: function(e) {
                            for (var t = 0; t < e.length; t++) {
                                var n = e[t],
                                    o = n.parentTId,
                                    r = n.tId;
                                if (null !== o) {
                                    $("#" + o).addClass(v);
                                    var a = p.getNodesByParam("tId", o, null);
                                    p.expandNode(a[0], !0, !1, !0)
                                }
                                $("#" + r).addClass(v)
                            }
                        },
                        preventEvent: function() {
                            var e = "#" + g + " .layui-anim";
                            return C.event("click", e,
                                function(e) {
                                    e.stopPropagation()
                                }),
                                C
                        },
                        loadCss: function() {
                            return $head = $("head"),
                                ztreeStyle = $head.find("style[ztree]"),
                            0 === ztreeStyle.length && $head.append($("<style ztree>").append('.ztree *{padding:0;margin:0;font-size:12px;font-family:Verdana,Arial,Helvetica,AppleGothic,sans-serif}.ztree{margin:0;padding:5px;color:#333}.ztree li{padding:0;margin:0;list-style:none;line-height:14px;text-align:left;white-space:nowrap;outline:0}.ztree li ul{margin:0;padding:0 0 0 18px}.ztree li ul.line{background:url(./img/line_conn.gif) 0 0 repeat-y;}.ztree li a{padding:1px 3px 0 0;margin:0;cursor:pointer;height:17px;color:#333;background-color:transparent;text-decoration:none;vertical-align:top;display:inline-block}.ztree li a:hover{text-decoration:underline}.ztree li a.curSelectedNode{padding-top:0px;background-color:#FFE6B0;color:black;height:16px;border:1px #FFB951 solid;opacity:0.8;}.ztree li a.curSelectedNode_Edit{padding-top:0px;background-color:#FFE6B0;color:black;height:16px;border:1px #FFB951 solid;opacity:0.8;}.ztree li a.tmpTargetNode_inner{padding-top:0px;background-color:#316AC5;color:white;height:16px;border:1px #316AC5 solid;opacity:0.8;filter:alpha(opacity=80)}.ztree li a.tmpTargetNode_prev{}.ztree li a.tmpTargetNode_next{}.ztree li a input.rename{height:14px;width:80px;padding:0;margin:0;font-size:12px;border:1px #7EC4CC solid;*border:0px}.ztree li span{line-height:16px;margin-right:2px}.ztree li span.button{line-height:0;margin:0;width:16px;height:16px;display:inline-block;vertical-align:middle;border:0 none;cursor:pointer;outline:none;background-color:transparent;background-repeat:no-repeat;background-attachment:scroll;background-image:url("./img/zTreeStandard.png");*background-image:url("./img/zTreeStandard.gif")}.ztree li span.button.chk{width:13px;height:13px;margin:0 3px 0 0;cursor:auto}.ztree li span.button.chk.checkbox_false_full{background-position:0 0}.ztree li span.button.chk.checkbox_false_full_focus{background-position:0 -14px}.ztree li span.button.chk.checkbox_false_part{background-position:0 -28px}.ztree li span.button.chk.checkbox_false_part_focus{background-position:0 -42px}.ztree li span.button.chk.checkbox_false_disable{background-position:0 -56px}.ztree li span.button.chk.checkbox_true_full{background-position:-14px 0}.ztree li span.button.chk.checkbox_true_full_focus{background-position:-14px -14px}.ztree li span.button.chk.checkbox_true_part{background-position:-14px -28px}.ztree li span.button.chk.checkbox_true_part_focus{background-position:-14px -42px}.ztree li span.button.chk.checkbox_true_disable{background-position:-14px -56px}.ztree li span.button.chk.radio_false_full{background-position:-28px 0}.ztree li span.button.chk.radio_false_full_focus{background-position:-28px -14px}.ztree li span.button.chk.radio_false_part{background-position:-28px -28px}.ztree li span.button.chk.radio_false_part_focus{background-position:-28px -42px}.ztree li span.button.chk.radio_false_disable{background-position:-28px -56px}.ztree li span.button.chk.radio_true_full{background-position:-42px 0}.ztree li span.button.chk.radio_true_full_focus{background-position:-42px -14px}.ztree li span.button.chk.radio_true_part{background-position:-42px -28px}.ztree li span.button.chk.radio_true_part_focus{background-position:-42px -42px}.ztree li span.button.chk.radio_true_disable{background-position:-42px -56px}.ztree li span.button.switch{width:18px;height:18px}.ztree li span.button.root_open{background-position:-92px -54px}.ztree li span.button.root_close{background-position:-74px -54px}.ztree li span.button.roots_open{background-position:-92px 0}.ztree li span.button.roots_close{background-position:-74px 0}.ztree li span.button.center_open{background-position:-92px -18px}.ztree li span.button.center_close{background-position:-74px -18px}.ztree li span.button.bottom_open{background-position:-92px -36px}.ztree li span.button.bottom_close{background-position:-74px -36px}.ztree li span.button.noline_open{background-position:-92px -72px}.ztree li span.button.noline_close{background-position:-74px -72px}.ztree li span.button.root_docu{background:none;}.ztree li span.button.roots_docu{background-position:-56px 0}.ztree li span.button.center_docu{background-position:-56px -18px}.ztree li span.button.bottom_docu{background-position:-56px -36px}.ztree li span.button.noline_docu{background:none;}.ztree li span.button.ico_open{margin-right:2px;background-position:-110px -16px;vertical-align:top;*vertical-align:middle}.ztree li span.button.ico_close{margin-right:2px;background-position:-110px 0;vertical-align:top;*vertical-align:middle}.ztree li span.button.ico_docu{margin-right:2px;background-position:-110px -32px;vertical-align:top;*vertical-align:middle}.ztree li span.button.edit{margin-right:2px;background-position:-110px -48px;vertical-align:top;*vertical-align:middle}.ztree li span.button.remove{margin-right:2px;background-position:-110px -64px;vertical-align:top;*vertical-align:middle}.ztree li span.button.ico_loading{margin-right:2px;background:url(./img/loading.gif) no-repeat scroll 0 0 transparent;vertical-align:top;*vertical-align:middle}ul.tmpTargetzTree{background-color:#FFE6B0;opacity:0.8;filter:alpha(opacity=80)}span.tmpzTreeMove_arrow{width:16px;height:16px;display:inline-block;padding:0;margin:2px 0 0 1px;border:0 none;position:absolute;background-color:transparent;background-repeat:no-repeat;background-attachment:scroll;background-position:-110px -80px;background-image:url("./img/zTreeStandard.png");*background-image:url("./img/zTreeStandard.gif")}ul.ztree.zTreeDragUL{margin:0;padding:0;position:absolute;width:auto;height:auto;overflow:hidden;background-color:#cfcfcf;border:1px #00B83F dotted;opacity:0.8;filter:alpha(opacity=80)}.zTreeMask{z-index:10000;background-color:#cfcfcf;opacity:0.0;filter:alpha(opacity=0);position:absolute}').append('.layui-treeSelect .ztree li span.button{font-family:layui-icon!important;font-size:16px;font-style:normal;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;background:none;line-height:inherit;}.layui-treeSelect .ztree li span.button.ico_open{display:none;}.layui-treeSelect .ztree li span.button.ico_close{display:none;}.layui-treeSelect .ztree li span.button.bottom_close:before,.layui-treeSelect .ztree li span.button.center_close:before,.layui-treeSelect .ztree li span.button.roots_close:before,.layui-treeSelect .ztree li span.button.root_close:before{content:"\\e623";}.layui-treeSelect .ztree li span.button.bottom_open:before,.layui-treeSelect .ztree li span.button.roots_open:before,.layui-treeSelect .ztree li span.button.center_open:before,.layui-treeSelect .ztree li span.button.root_open:before{content:"\\e625";}.layui-treeSelect .ztree li a:hover{text-decoration:none;}.layui-treeSelect .ztree *{font-size:14px;}.layui-treeSelect .ztree li{line-height:inherit;padding:5px 0;}.layui-treeSelect .ztree li span.button.switch{position:relative;top:-1px;}.layui-treeSelect .ztree li a,.ztree li span{line-height:18px;margin:5px 0 0 3px;height:inherit;}.layui-treeSelect .ztree li a.curSelectedNode{background:none;border:none;height:inherit;padding-top:1px;}.layui-treeSelect .layui-anim::-webkit-scrollbar{width:6px;height:6px;background-color:#F5F5F5;}.layui-treeSelect .layui-anim::-webkit-scrollbar-track{box-shadow:inset 0 0 6px rgba(107,98,98,0.3);border-radius:10px;background-color:#F5F5F5;}.layui-treeSelect .layui-anim::-webkit-scrollbar-thumb{border-radius:10px;box-shadow:inset 0 0 6px rgba(107,98,98,0.3);background-color:#555;}.layui-treeSelect.layui-form-select .layui-anim{display:none;position:absolute;left:0;top:42px;padding:5px 0;z-index:9999;min-width:100%;max-height:300px;overflow-y:auto;background-color:#fff;border-radius:2px;box-shadow:0 2px 4px rgba(0,0,0,.12);box-sizing:border-box;}.layui-treeSelect.layui-form-selected .layui-anim{display:block;}.layui-treeSelect .ztree li ul.line{background:none;position:relative;}.layui-treeSelect .ztree li .center_docu::after,.ztree li .bottom_docu::after{content:"";position:absolute;left:8px;top:8px;width:8px;border-top:1px dotted #ece;}.layui-treeSelect .ztree li span.button.ico_open{display:inline-block;position:relative;top:1px;}.layui-treeSelect .ztree li span.button.ico_close{display:inline-block;position:relative;top:1px;}.layui-treeSelect .ztree li span.button.ico_open:before{content:"\\e643";}.layui-treeSelect .ztree li span.button.ico_close:before{content:"\\e63f";}')),
                                C
                        },
                        configStyle: function() {
                            null != l && null != l.line && l.line.enable || $("#" + g).find("li .center_docu,li .bottom_docu").hide(),
                            null != l && null != l.folder && l.folder.enable || ($("#" + g).find("li span.button.ico_open").hide(), $("#" + g).find("li span.button.ico_close").hide())
                        },
                        event: function(e, t, n) {
                            $("body").on(e, t, n)
                        }
                    };
                return C.init(),
                    new TreeSelect
            },
            TreeSelect.prototype.refresh = function(e) {
                obj.treeObj(e).reAsyncChildNodes(null, "refresh")
            },
            TreeSelect.prototype.checkNode = function(e, t) {
                var n = obj.filter(e),
                    o = n.find(".layui-select-title input"),
                    r = obj.treeObj(e),
                    a = r.getNodeByParam("id", t, null),
                    i = a.name;
                o.val(i),
                    n.find("a[treenode_a]").removeClass("curSelectedNode"),
                    obj.get(e).val(t).attr("value", t),
                    r.selectNode(a)
            },
            TreeSelect.prototype.revokeNode = function(e, t) {
                var n = obj.filter(e);
                n.find("a[treenode_a]").removeClass("curSelectedNode"),
                    n.find(".layui-select-title input.layui-input").val(""),
                    obj.get(e).attr("value", "").val(""),
                    obj.treeObj(e).expandAll(!1),
                t && t({
                    treeId: n.attr("id")
                })
            },
            TreeSelect.prototype.destroy = function(e) {
                obj.filter(e).remove(),
                    obj.get(e).show()
            },
            TreeSelect.prototype.zTree = function(e) {
                return obj.treeObj(e)
            };
        var obj = {
                get: function(e) {
                    return e || layui.hint().error("filter 不能为空"),
                        $("*[lay-filter=" + e + "]")
                },
                filter: function(e) {
                    return obj.get(e).next()
                },
                treeObj: function(e) {
                    var t = obj.filter(e).find(".layui-treeSelect-body").attr("id");
                    return $.fn.zTree.getZTreeObj(t)
                }
            },
            mod = new TreeSelect;
        exports(_MOD, mod)
    });